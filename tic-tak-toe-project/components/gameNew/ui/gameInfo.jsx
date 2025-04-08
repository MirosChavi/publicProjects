import FavStar from "./icons/favoriteStar";
import UserIcon from "./icons/userIcon";
import HistoryIcon from "./icons/historyIcon";

export function GameInfo({ playersCount, isRatingGame, timeMode }) {
  return (
    <div className="flex items-center gap-3 text-slate-400 text-xs">
      {isRatingGame && <FavStar />}
      <div className="flex items-center gap-1">
        <UserIcon /> {playersCount}
      </div>
      <div className="flex items-center gap-1">
        <HistoryIcon />
        <p>{timeMode}</p>
      </div>
    </div>
  );
}
