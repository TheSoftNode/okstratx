
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface WebSocketHookOptions {
    reconnectAttempts?: number;
    reconnectInterval?: number;
    onOpen?: (event: WebSocketEventMap["open"]) => void;
    onClose?: (event: WebSocketEventMap["close"]) => void;
    onError?: (event: WebSocketEventMap["error"]) => void;
    autoReconnect?: boolean;
}

interface WebSocketHookReturn<T> {
    data: T | null;
    isConnected: boolean;
    isConnecting: boolean;
    error: Event | null;
    send: (data: any) => void;
    reconnect: () => void;
}



export function useWebSocket<T = any>(
    url: string,
    symbol?: string,  // <-- New symbol input
    options: WebSocketHookOptions = {}
): WebSocketHookReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const [error, setError] = useState<Event | null>(null);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectCountRef = useRef<number>(0);
    const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

    const {
        reconnectAttempts = 5,
        reconnectInterval = 1500,
        onOpen,
        onClose,
        onError,
        autoReconnect = true,
    } = options;

    const connectWebSocket = useCallback(() => {
        if (typeof window === "undefined") return;

        try {
            setIsConnecting(true);
            const websocket = new WebSocket(url);

            websocket.onopen = (event) => {
                setIsConnected(true);
                setIsConnecting(false);
                setError(null);
                reconnectCountRef.current = 0;

                if (onOpen) onOpen(event);

                // Send symbol to server after connection
                if (symbol) {
                    websocket.send(JSON.stringify({ action: "subscribe", symbol }));
                }
            };

            websocket.onmessage = (event) => {
                try {
                    const parsedData = JSON.parse(event.data) as T;
                    setData(parsedData);
                } catch (e) {
                    console.error("Error parsing WebSocket message:", e);
                    setData(event.data as unknown as T);
                }
            };

            websocket.onclose = (event) => {
                setIsConnected(false);
                if (onClose) onClose(event);

                if (autoReconnect && reconnectCountRef.current < reconnectAttempts) {
                    reconnectCountRef.current += 1;

                    if (reconnectTimerRef.current) {
                        clearTimeout(reconnectTimerRef.current);
                    }

                    reconnectTimerRef.current = setTimeout(() => {
                        connectWebSocket();
                    }, reconnectInterval * reconnectCountRef.current);
                }
            };

            websocket.onerror = (event) => {
                setError(event);
                setIsConnecting(false);
                if (onError) onError(event);
            };

            wsRef.current = websocket;
        } catch (error) {
            setIsConnecting(false);
            setError(error as Event);
        }
    }, [url, symbol, reconnectAttempts, reconnectInterval, onOpen, onClose, onError, autoReconnect]);

    const send = useCallback((data: any) => {
        if (wsRef.current && isConnected) {
            wsRef.current.send(typeof data === "string" ? data : JSON.stringify(data));
        }
    }, [isConnected]);

    const reconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
        }
        reconnectCountRef.current = 0;
        connectWebSocket();
    }, [connectWebSocket]);

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [connectWebSocket]);

    return {
        data,
        isConnected,
        isConnecting,
        error,
        send,
        reconnect,
    };
}


