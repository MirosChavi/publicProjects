import Logo from "./logo";
import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";

export default function Header(): JSX.Element {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const scrollHandler = () => {
            const scrollPosition = window.scrollY;
            const toggleStickyPosition = 100;

            if (scrollPosition >= toggleStickyPosition) {
                setIsVisible(false);
            } else {
                // Прокрутка вверх - показываем хедер
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <header
            id="header"
            className={`transition-all duration-700 ease-in-out ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-32 opacity-0"
            } sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-neon-pink via-black to-neon-blue border-b-white border-b opacity-85`}
        >
            <Logo className=" max-w-xs h-20 w-auto" />
            <div className="text-white text-3xl uppercase">
                <a className="cursor-pointer transition-opacity opacity-75 hover:opacity-100 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-purple-400 mx-20">
                    videos
                </a>
                <a className="cursor-pointer transition-opacity opacity-75 hover:opacity-100 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 mx-20">
                    leacks
                </a>
                <a className="cursor-pointer transition-opacity opacity-75 hover:opacity-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-400 to-teal-400 mx-20">
                    news
                </a>
            </div>

            <div className="max-w-xs text-white bold text-l flex items-center">
                <IonIcon icon={personCircleOutline} size="large"></IonIcon>
                <a
                    className="pl-2 hover:underline underline-offset-4 transition-opacity opacity-75 hover:opacity-100"
                    href="/admin/panel"
                >
                    GUEST
                </a>
            </div>
        </header>
    );
}
