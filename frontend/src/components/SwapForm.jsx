import React, { useState } from "react";
import { ethers } from "ethers";

export default function SwapForm() {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("cUSD");

  async function handleSwap() {
    if (!window.ethereum) return alert("Please install MetaMask or Celo Wallet");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = "0x..."; // MiniSwap deployed address
    const abi = [ /* contract ABI JSON */ ];

    const contract = new ethers.Contract(contractAddress, abi, signer);

    const value = ethers.parseEther(amount);

    if(token === "cUSD") {
      await contract.swapCELOToToken("0x..."); // cUSD address
    } else {
      await contract.swapCELOToToken("0x..."); // cEUR address
    }

    alert("Swap executed!");
  }

  return (
    <div className="bg-white p-6 rounded shadow-md w-80">
      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="Amount in CELO"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        className="border p-2 w-full mb-4"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      >
        <option value="cUSD">cUSD</option>
        <option value="cEUR">cEUR</option>
      </select>
      <button className="bg-blue-500 text-white p-2 w-full" onClick={handleSwap}>
        Swap
      </button>
    </div>
  );
}
