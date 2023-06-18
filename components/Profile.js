import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSignMessage,
} from "wagmi";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";

export function Profile() {
  const router = useRouter();
  const { token } = router.query;
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { data, signMessage, variables } = useSignMessage();

  useEffect(() => {
    if (data) {
      const payload = { signature: data, token, account: address };
      const callbackUrl = `http://localhost:3001/callback?signature=${encodeURIComponent(
        payload.signature
      )}&address=${encodeURIComponent(payload.account)}&msg=${payload.token}`;
      window.location.href = callbackUrl;
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  }, [data, token, address]);

  useEffect(() => {
    // disconnect();
    if (isConnected) {
      signMessage({ message: token });
    }
  }, [isConnected]);

  if (isConnected) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
          <Image src={Logo} alt="App Logo" className="mx-auto mb-4 w-20 h-20" />
          <h1 className="text-2xl mb-4">
            WalletDrop: Share files to wallet addresses instantly
          </h1>
          <div className="mb-4">
            {ensName ? `${ensName} (${address})` : address}
          </div>
          <div className="mb-4">Connected to {connector && connector.name}</div>
          <button
            onClick={disconnect}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <Image
          src={Logo}
          alt="App Logo"
          width={120}
          height={120}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl mb-4">WalletDrop</h1>
        <h3 className="text-xl mb-4">
          Share files instantly to wallet addresses and ENS
        </h3>
        {connectors.map((connector) => (
          <div key={connector.id} className="mb-4">
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className={`w-full px-4 py-2 text-white rounded-lg shadow-md ${
                connector.ready
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500"
              } ${
                isLoading &&
                connector.id === pendingConnector?.id &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              {connector && connector.name}
            </button>
          </div>
        ))}

        {error && <div className="text-red-500 mt-4">{error.message}</div>}
      </div>
    </div>
  );
}
