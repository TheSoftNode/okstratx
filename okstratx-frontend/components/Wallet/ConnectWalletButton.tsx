import { useState } from "react";
import { useConnect, useDisconnect, useAccount, Connector, CreateConnectorFn } from "wagmi";
import { useWalletContext } from "../Providers/WagmiProviders";

export default function WalletConnectModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected, chain } = useAccount();

    const {
        isConnecting,
        setIsConnecting,
        connectionError,
        setConnectionError,
    } = useWalletContext();

    const handleConnect = async (connector: Connector<CreateConnectorFn>) => {
        try {
            setIsConnecting(true);
            setConnectionError(null);
            await connect({ connector });
            if (isOpen) setIsOpen(false); // Close modal after successful connection
        } catch (err) {
            setConnectionError("Failed to connect wallet");
            console.error("Wallet connection error:", err);
        } finally {
            setIsConnecting(false);
        }
    };

    // Format the address for display
    const formatAddress = (addr: string) => {
        if (!addr) return "";
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <div className="relative">
            {/* Main button that toggles the modal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
                {isConnected ? (
                    <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        {formatAddress(address!)}
                    </span>
                ) : (
                    "Connect Wallet"
                )}
            </button>

            {/* Modal dialog */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Modal content */}
                    <div className="relative bg-gray-900 p-6 rounded-xl shadow-xl max-w-md w-full mx-4 border border-indigo-800">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {isConnected ? "Wallet Connected" : "Connect Wallet"}
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {isConnected ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <p className="text-gray-400 mb-1">Connected Address</p>
                                        <p className="text-white font-mono">{address}</p>
                                    </div>

                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <p className="text-gray-400 mb-1">Network</p>
                                        <p className="text-white">{chain?.name || "Unknown"}</p>
                                    </div>

                                    <button
                                        onClick={() => disconnect()}
                                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                    >
                                        Disconnect Wallet
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {connectionError && (
                                        <div className="text-red-400 bg-red-800/30 p-3 rounded-lg mb-4">
                                            {connectionError}
                                        </div>
                                    )}

                                    <div className="grid gap-3">
                                        {connectors.map((connector) => (
                                            <button
                                                key={connector.id}
                                                onClick={() => handleConnect(connector)}
                                                disabled={!connector.ready || isConnecting}
                                                className="flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {isConnecting ? (
                                                    <div className="flex items-center">
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Connecting...
                                                    </div>
                                                ) : (
                                                    <>
                                                        Connect {connector.name}
                                                    </>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
