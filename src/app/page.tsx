"use client";

import dynamic from "next/dynamic";

const GameBoard = dynamic(() => import("../components/GameBoard"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Tic Tac Toe 7x7</h1>
      <GameBoard />
    </div>
  );
}
