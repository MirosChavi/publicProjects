import { clsx } from "clsx";

export function GameLayout({
  backLink,
  title,
  gameInfo,
  playersList,
  gameMoveInfo,
  actions,
  gameCells,
}) {
  return (
    <div className="pb-10">
      <div className="pl-2">
        {backLink}
        {title}
        {gameInfo}
      </div>
      <div
        className={
          "mt-4 py-4 px-8 rounded-2xl shadow-md bg-white justify-between grid grid-cols-2 gap-3"
        }
      >
        {playersList}
      </div>
      <div className="mt-6 pt-5 pb-7 px-8 rounded-2xl shadow-md bg-white">
        <div className="flex gap-3 items-center">
          <div className="mr-auto ">{gameMoveInfo}</div>
          {actions}
        </div>
        <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] pl-px pt-px mt-3">
          {gameCells}
        </div>
      </div>
    </div>
  );
}
