// "use client";

// import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { useWalletContext } from "../Providers/WagmiProviders";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// declare global {
//     interface Window {
//         okxwallet?: any;
//         phantom?: {
//             ethereum?: any;
//         };
//     }
// }

// export default function ConnectWalletButton() {
//     const { connect, connectors, status, error: connectError } = useConnect();
//     const { disconnect } = useDisconnect();
//     const { address, isConnected, chain } = useAccount();
//     const { isConnecting, setIsConnecting, connectionError, setConnectionError } = useWalletContext();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [hasPhantom, setHasPhantom] = useState(false);

//     console.log(connectors)

//     useEffect(() => {
//         setHasPhantom(!!window.phantom?.ethereum);
//     }, []);

//     const handleConnect = async (connectorIndex: number) => {
//         try {
//             setIsConnecting(true);
//             setConnectionError(null);
//             await connect({ connector: connectors[connectorIndex] });
//             setIsModalOpen(false);
//         } catch (error) {
//             setConnectionError("Failed to connect wallet");
//             console.error("Connection error:", error);
//         } finally {
//             setIsConnecting(false);
//         }
//     };

//     const walletOptions = [
//         {
//             name: "OKX Wallet",
//             connector: 0,
//             icon: (
//                 <svg viewBox="0 0 32 32" className="w-6 h-6">
//                     <path fill="#000" d="M16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16S0 24.8 0 16 7.2 0 16 0z" />
//                     <path fill="#fff" d="M22.8 9.2h-5.1l-3.5 6-3.5-6H6.7l6.3 10.9V22h2.1v-1.9l6.3-10.9h-4.6z" />
//                 </svg>
//             ),
//             available: !!window.okxwallet
//         },
//         {
//             name: "Phantom",
//             connector: 1,
//             icon: (
//                 <svg viewBox="0 0 32 32" className="w-6 h-6">
//                     <path fill="#4C2896" d="M22.6 4h-13c-3.1 0-5.6 2.5-5.6 5.6v13c0 3.1 2.5 5.6 5.6 5.6h13c3.1 0 5.6-2.5 5.6-5.6v-13c0-3.1-2.5-5.6-5.6-5.6z" />
//                     <path fill="#fff" d="M20.9 10.1c.6 0 1 .4 1 1v9.8c0 .6-.4 1-1 1h-1.3c-.6 0-1-.4-1-1v-9.8c0-.6.4-1 1-1h1.3zm-6.4 3.1c.6 0 1 .4 1 1v6.7c0 .6-.4 1-1 1h-1.3c-.6 0-1-.4-1-1v-6.7c0-.6.4-1 1-1h1.3z" />
//                 </svg>
//             ),
//             available: hasPhantom
//         },
//         {
//             name: "WalletConnect",
//             connector: 2,
//             icon: (
//                 <svg viewBox="0 0 32 32" className="w-6 h-6">
//                     <path fill="#3B99FC" d="M16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16S0 24.8 0 16 7.2 0 16 0z" />
//                     <path fill="#fff" d="M9.6 11.3c3.1-3 8.1-3 11.2 0l.4.4c.1.1.1.3 0 .4l-1.3 1.2c-.1.1-.2.1-.3 0l-.5-.5c-2.2-2.1-5.7-2.1-7.9 0l-.5.5c-.1.1-.2.1-.3 0L9.2 12c-.1-.1-.1-.3 0-.4l.4-.3zm13.5 2.4l1.1 1.1c.1.1.1.3 0 .4l-5 4.8c-.1.1-.3.1-.4 0l-3.5-3.4c-.1-.1-.2-.1-.3 0l-3.5 3.4c-.1.1-.3.1-.4 0l-5-4.8c-.1-.1-.1-.3 0-.4l1.1-1.1c.1-.1.3-.1.4 0l3.5 3.4c.1.1.2.1.3 0l3.5-3.4c.1-.1.3-.1.4 0l3.5 3.4c.1.1.2.1.3 0l3.5-3.4c.1-.1.3-.1.4 0z" />
//                 </svg>
//             ),
//             available: true
//         }
//     ];

//     return (
//         <div className="relative">
//             {isConnected ? (
//                 <div className="flex items-center space-x-4">
//                     <div className="text-sm bg-indigo-900/20 px-4 py-2 rounded-full">
//                         <span className="text-indigo-200">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
//                         <span className="mx-2 text-pink-300">|</span>
//                         <span className="text-purple-300">{chain?.name}</span>
//                     </div>
//                     <button
//                         onClick={() => disconnect()}
//                         className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
//                     >
//                         Disconnect
//                     </button>
//                 </div>
//             ) : (
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     disabled={isConnecting}
//                     className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 relative overflow-hidden group"
//                 >
//                     <span className="relative z-10 flex items-center justify-center">
//                         {isConnecting ? (
//                             <>
//                                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Connecting...
//                             </>
//                         ) : (
//                             "Connect Wallet"
//                         )}
//                     </span>
//                     <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                 </button>
//             )}

//             <AnimatePresence>
//                 {isModalOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//                         onClick={() => setIsModalOpen(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-indigo-500/20"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex justify-between items-center mb-6">
//                                 <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
//                                 <button
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="text-pink-300 hover:text-white"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>

//                             <div className="space-y-3">
//                                 {walletOptions.map((wallet) => (
//                                     wallet.available && (
//                                         <button
//                                             key={wallet.name}
//                                             onClick={() => handleConnect(wallet.connector)}
//                                             disabled={isConnecting}
//                                             className="w-full flex items-center justify-between p-4 bg-indigo-800/50 hover:bg-indigo-700/50 rounded-xl border border-indigo-700/50 transition-all duration-200 group"
//                                         >
//                                             <div className="flex items-center space-x-3">
//                                                 <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all">
//                                                     {wallet.icon}
//                                                 </div>
//                                                 <span className="font-medium text-white">{wallet.name}</span>
//                                             </div>
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                             </svg>
//                                         </button>
//                                     )
//                                 ))}
//                             </div>

//                             {connectionError && (
//                                 <div className="mt-4 p-3 bg-pink-900/50 text-pink-200 rounded-lg text-sm flex items-center">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                     {connectionError}
//                                 </div>
//                             )}
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }
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
