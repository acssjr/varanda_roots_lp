"use client";

import { useEffect, useState } from "react";
import {
  COURSE_CHECKOUT_URL,
  COURSE_PRICING,
  courseStickyQuestionUrl,
  shouldShowCourseStickyCta,
  type CourseStickyCtaState,
} from "@/lib/course-landing-content";
import styles from "./CourseLandingPage.module.css";

const initialState: CourseStickyCtaState = {
  heroVisible: true,
  offerVisible: false,
  finalVisible: false,
  footerVisible: false,
};

export function CourseStickyCta() {
  const [visibility, setVisibility] = useState(initialState);

  useEffect(() => {
    const targets = [
      { id: "course-hero-actions", key: "heroVisible" },
      { id: "course-offer", key: "offerVisible" },
      { id: "course-final-cta", key: "finalVisible" },
      { id: "course-footer", key: "footerVisible" },
    ] as const;

    const observers = targets.flatMap(({ id, key }) => {
      const element = document.getElementById(id);
      if (!element) return [];
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibility((current) => ({ ...current, [key]: entry.isIntersecting }));
        },
        { threshold: 0.08 },
      );
      observer.observe(element);
      return [observer];
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = shouldShowCourseStickyCta(visibility);

  return (
    <aside className={styles.stickyCta} data-visible={visible ? "true" : "false"} aria-hidden={!visible}>
      <div className={styles.stickyCtaInner}>
        <p><strong>Aprenda o Roots</strong><span>Curso online · {COURSE_PRICING.installment}</span></p>
        <div className={styles.stickyActions}>
          <a href={courseStickyQuestionUrl} target="_blank" rel="noreferrer" tabIndex={visible ? 0 : -1} aria-label="Tirar uma dúvida sobre o curso">Dúvida?</a>
          <a className={styles.stickyBuy} href={COURSE_CHECKOUT_URL} target="_blank" rel="noreferrer" tabIndex={visible ? 0 : -1}>Comprar</a>
        </div>
      </div>
    </aside>
  );
}
