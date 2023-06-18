import { useState } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Install from "../assets/walletdrop-install.gif";
import Login from "../assets/walletdrop-login.gif";
import Receive from "../assets/walletdrop-receive.gif";
import Send from "../assets/walletdrop-send.gif";

function Toast({ show, message }) {
  return (
    show && (
      <div className="fixed bottom-0 right-0 m-4 p-2 rounded bg-gray-500 text-white">
        {message}
      </div>
    )
  );
}

function CopyBtn({ copyToClipboard, value }) {
  return (
    <div className="flex items-center text-white text-lg md:text-xl w-full">
      <span className="mr-2 text-green-500">$</span>
      <input
        type="text"
        value={value}
        readOnly
        className="bg-gray-700 text-white w-full py-1 px-2"
      />
      <button
        onClick={() => copyToClipboard(value)}
        className={`ml-2 py-1 px-2 rounded ${"bg-green-500 hover:bg-green-600 text-white"}`}
      >
        📋
      </button>
    </div>
  );
}

export default function App() {
  const [copySuccess, setCopySuccess] = useState("");

  function copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(
      function () {
        setCopySuccess("Copied!");
        setTimeout(() => {
          setCopySuccess("");
        }, 3000);
      },
      function () {
        setCopySuccess("Failed to copy text.");
        setTimeout(() => {
          setCopySuccess("");
        }, 3000);
      }
    );
  }
  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 flex flex-col items-center">
      <nav className="w-full max-w-4xl flex justify-end mb-12">
        <div className="flex space-x-4">
          <a
            href="https://walletdrop.notion.site/WalletDrop-Documentation-6dee884c6ea2409f911727b516f5b3d3?pvs=4"
            target="_blank"
            className="text-lg text-white"
          >
            📄 Docs
          </a>
          <a
            href="https://github.com/0xfreddyv/walletdrop"
            target="_blank"
            className="text-lg text-white"
          >
            💻 GitHub
          </a>
        </div>
      </nav>
      <header className="text-center">
        <Image
          src={Logo}
          alt="App Logo"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold">WalletDrop</h1>
        <p className="text-xl mt-2">
          Share files instantly to wallet addresses and ENS
        </p>
      </header>

      <section className="mt-8 flex flex-col items-center w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-16">
          WalletDrop is very easy to use!
        </h2>
        <div className="flex items-center justify-between bg-gray-700 w-full p-2 rounded-md mb-4 shadow-md">
          <div className="flex items-center text-white text-lg md:text-xl w-full">
            <span className="mr-2 text-green-500">$</span>
            <input
              type="text"
              value="npm install -g walletdrop"
              readOnly
              className="bg-gray-700 text-white w-full"
            />
          </div>

          <button
            onClick={() => copyToClipboard("npm install -g walletdrop")}
            className={`ml-4 font-bold py-2 px-4 rounded ${"bg-green-500 hover:bg-green-600 text-white"}`}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="mb-6 w-full md:w-1/2 p-2">
            <h3 className="text-xl mb-2 text-center">Install</h3>
            <Image
              layout="responsive"
              width={600}
              height={300}
              className="object-cover mb-2"
              src={Install}
              alt="Step 1"
            />
            <CopyBtn
              copyToClipboard={() => copyToClipboard}
              value={"npm install -g walletdrop"}
            />
          </div>

          <div className="mb-6 w-full md:w-1/2 p-2">
            <h3 className="text-xl mb-2 text-center">Login</h3>
            <Image
              layout="responsive"
              width={600}
              height={300}
              className="object-cover mb-2"
              src={Login}
              alt="Step 2"
            />
            <CopyBtn
              copyToClipboard={copyToClipboard}
              value={"walletdrop login"}
            />
          </div>

          <div className="mb-6 w-full md:w-1/2 p-2">
            <h3 className="text-xl mb-2 text-center">Receive Files</h3>
            <Image
              layout="responsive"
              width={600}
              height={300}
              className="object-cover mb-2"
              src={Receive}
              alt="Step 3"
            />
            <CopyBtn
              copyToClipboard={copyToClipboard}
              value={"walletdrop receive"}
            />
            <p className="mt-2">
              You can find the files which you have received in "walletdrop"
              directory of your Home
            </p>
          </div>

          <div className="mb-6 w-full md:w-1/2 p-2">
            <h3 className="text-xl mb-2 text-center">Send Files</h3>
            <Image
              layout="responsive"
              width={600}
              height={300}
              className="object-cover mb-2"
              src={Send}
              alt="Step 4"
            />
            <CopyBtn
              copyToClipboard={copyToClipboard}
              value={"walletdrop send filename.ext 0x123ab"}
            />
          </div>
        </div>
      </section>
      <Toast show={copySuccess} message="Copied to Clipboard" />

      <footer className="mt-12 text-center">
        <p className="text-sm">
          Powered by{" "}
          <a
            href="https://libp2p.io"
            target="_blank"
            className="text-green-500"
          >
            Libp2p
          </a>
        </p>
      </footer>
    </div>
  );
}
