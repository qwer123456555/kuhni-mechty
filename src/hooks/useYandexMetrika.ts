import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const METRIKA_ID = 106687295; // ← ваш номер счётчика

export function useYandexMetrika() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.ym !== "undefined") {
      window.ym(METRIKA_ID, "hit", window.location.href);
    }
  }, [location]);
}