import ZeroIcon from "./icons/zeroIcon";
import CrossIcon from "./icons/crossIcon";
import TriangleIcon from "./icons/triangleIcon";
import SquareIcon from "./icons/squareIcon";
import { GAME_SYMBOLS } from "../constants";

export function GameSymbol({ symbol, className }) {
  const Icon =
    {
      [GAME_SYMBOLS.CROSS]: CrossIcon,
      [GAME_SYMBOLS.SQUARE]: SquareIcon,
      [GAME_SYMBOLS.TRIANGLE]: TriangleIcon,
      [GAME_SYMBOLS.ZERO]: ZeroIcon,
    }[symbol] ?? CrossIcon;
  return <Icon className={className} />;
}
