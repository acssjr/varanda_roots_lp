type ActionArrowProps = {
  className?: string;
};

export function ActionArrow({ className = "" }: ActionArrowProps) {
  return (
    <i className={`action-arrow ${className}`.trim()} aria-hidden="true">
      <span>
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </i>
  );
}
