import React from "react";
import Link from "next/link";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionText,
  actionHref,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 max-w-md mx-auto">
      {icon ? (
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#EAE4D7] text-[#173B32] mb-4">
          {icon}
        </div>
      ) : (
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#EAE4D7] text-[#173B32] mb-4">
          <svg
            className="w-6 h-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
          </svg>
        </div>
      )}
      <h3 className="text-base font-serif font-medium text-[#182522] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[#626A65] mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && actionHref && (
        <Link href={actionHref}>
          <Button variant="primary" size="md">
            {actionText}
          </Button>
        </Link>
      )}
      {actionText && onAction && !actionHref && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

