import Image from "next/image";
import { GameSymbol } from "./gameSymbol";
import { clsx } from "clsx";
import { useNow } from "../../lib/timers";

export function PlayerInfo({
  isRight,
  name,
  rating,
  avatar,
  symbol,
  timer,
  timerStartAt,
}) {
  const now = useNow(1000, timerStartAt);
  const mils = Math.max(now ? timer - (now - timerStartAt) : timer, 0);

  const seconds = Math.ceil(mils / 1000);
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const isDanger = seconds < 10;

  const getTimerColor = () => {
    if (timerStartAt) {
      return isDanger ? "text-orange-600" : "text-slate-900";
    }
    return "text-slate-300";
  };
  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative", isRight && "order-3")}>
        <div
          className={"flex items-center gap-2 text-start text-teal-600 w-44"}
        >
          <Image height={48} width={48} src={avatar} alt="avatar" unoptimized />
          <div className="overflow-hidden">
            <div className="text-lg leading-tight truncate ">{name}</div>
            <div className="text-xs leading-tight text-slate-400">
              Рейтинг: {rating}
            </div>
          </div>
        </div>
        <div className="w-5 h-5 bg-white shadow rounded-full absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={symbol} />
        </div>
      </div>
      <div
        className={clsx("h-6 w-px bg-slate-200", isRight && "order-2")}
      ></div>
      <div
        className={clsx(
          "text-lg font-semibold w-14",
          isRight && "order-1",
          getTimerColor(),
        )}
      >
        {minutesString}:{secondsString}
      </div>
    </div>
  );
}
