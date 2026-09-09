"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/site-content";

export function DocumentLanguage({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  return null;
}
