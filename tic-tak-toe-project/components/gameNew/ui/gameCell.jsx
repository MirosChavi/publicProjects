import clsx from "clsx";
import { GameSymbol } from "./gameSymbol";
import { memo } from "react";

export const GameCell = memo(function GameCell({
  onClick,
  isWinner,
  disabled,
  symbol,
  index,
}) {
  console.log("render cell");
  return (
    <button
      onClick={() => onClick(index)}
      disabled={disabled}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        isWinner && "bg-orange-900/20",
      )}
    >
      {symbol && <GameSymbol className="w-5 h-5" symbol={symbol} />}
    </button>
  );
});
