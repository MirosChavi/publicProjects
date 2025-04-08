import Link from "next/link";
import ArrowLeft from "./icons/arrowLeftIcon";

export function BackLink() {
  return (
    <Link
      href="#"
      className="flex items-center gap-2 text-xs text-teal-600 -mb-0.5"
    >
      <ArrowLeft />
      На главную
    </Link>
  );
}
