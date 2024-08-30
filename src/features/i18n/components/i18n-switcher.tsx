import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import { supportLanguages } from "..";

export const I18nSwitcher = () => {
  const { i18n, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">{t("i18.toggle-button-text-sr")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportLanguages.map((language) => (
          <DropdownMenuItem
            onClick={() => i18n.changeLanguage(language.key)}
            key={language.key}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
