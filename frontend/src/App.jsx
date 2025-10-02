import React from "react";
import SwapForm from "./components/SwapForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Celo MiniSwap</h1>
      <SwapForm />
    </div>
  );
}

export default App;
