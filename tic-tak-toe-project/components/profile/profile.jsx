import Image from "next/image";
import avatarSrc from "./avatar.png";
import clsx from "clsx";

export function Profile({ className, name, rating, avatar = avatarSrc }) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 text-start text-teal-600",
        className,
      )}
    >
      <Image height={48} width={48} src={avatar} alt="avatar" unoptimized />
      <div className="overflow-hidden">
        <div className="text-lg leading-tight truncate ">{name}</div>
        <div className="text-xs leading-tight text-slate-400">
          Рейтинг: {rating}
        </div>
      </div>
    </div>
  );
}
