import type { Metadata } from "next";
import { CourseLandingPage } from "@/components/course-landing/CourseLandingPage";

export const metadata: Metadata = {
  title: "Aprenda o Roots com Pía e PC | Varanda Roots",
  description: "27 aulas de Forró Roots organizadas em quatro módulos, com dois bônus, legendas em três idiomas e acesso por tempo indeterminado.",
};

export default function AprendaORootsPage() {
  return <CourseLandingPage />;
}
