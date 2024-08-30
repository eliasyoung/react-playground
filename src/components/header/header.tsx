import { TopNav } from "./top-nav";
import { ThemeToogle } from "@features/theme-toggle/components/theme-toggle";
import { I18nSwitcher } from "@/features/i18n/components/i18n-switcher";
import { Link } from "@tanstack/react-router";
import Logo from "@assets/favicon.svg?react";

export const Header = () => {
  return (
    <header className="w-full xl:px-10 flex items-center">
      <Link to={"/"}>
        <Logo className="size-[75%] drop-shadow-md" />
      </Link>
      <TopNav />
      <div className="flex flex-row items-center gap-4">
        <I18nSwitcher />
        <ThemeToogle />
      </div>
    </header>
  );
};
