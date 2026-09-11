import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";

export const metadata: Metadata = {
  title: "Página não encontrada | Varanda Roots",
};

export default function NotFound() {
  return <NotFoundView />;
}
