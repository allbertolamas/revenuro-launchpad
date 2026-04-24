// Empty state con ilustraciones SVG animadas (CSS keyframes, no GSAP).

import type { ReactNode } from "react";

type EmptyType =
  | "leads"
  | "conversations"
  | "appointments"
  | "notifications"
  | "activity";

type Props = {
  type: EmptyType;
  title: string;
  description: string;
  cta?: { label: string; onClick: () => void };
  size?: number;
};

export function EmptyStateIllustration({
  type,
  title,
  description,
  cta,
  size = 80,
}: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ padding: "60px 24px", gap: 16 }}
    >
      <div className="brerev-empty-float">{renderIllustration(type, size)}</div>
      <div>
        <h3
          className="text-[18px] font-semibold"
          style={{ color: "var(--platinum)" }}
        >
          {title}
        </h3>
        <p
          className="mx-auto mt-2 text-[14px] sm:text-[15px]"
          style={{ color: "var(--slate)", maxWidth: 320, lineHeight: 1.55 }}
        >
          {description}
        </p>
      </div>
      {cta && (
        <button type="button" onClick={cta.onClick} className="btn-ghost mt-2">
          {cta.label}
        </button>
      )}

      <style>{`
        @keyframes brerev-empty-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .brerev-empty-float { animation: brerev-empty-float 3s ease-in-out infinite; }

        @keyframes brerev-rock {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .brerev-rock { animation: brerev-rock 2.4s ease-in-out infinite; transform-origin: center; }

        @keyframes brerev-pulse-arrow {
          0%, 100% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .brerev-pulse-arrow { animation: brerev-pulse-arrow 1.6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }

        @keyframes brerev-bubble-stagger {
          0%, 40%, 100% { opacity: 0.25; transform: translateY(2px); }
          20% { opacity: 1; transform: translateY(0); }
        }
        .brerev-bubble-1 { animation: brerev-bubble-stagger 2.4s ease-in-out infinite; }
        .brerev-bubble-2 { animation: brerev-bubble-stagger 2.4s ease-in-out 0.5s infinite; }

        @keyframes brerev-draw-check {
          0% { stroke-dashoffset: 24; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 24; }
        }
        .brerev-draw-check { stroke-dasharray: 24; animation: brerev-draw-check 3s ease-in-out infinite; }

        @keyframes brerev-bell-swing {
          0%, 100% { transform: rotate(0); }
          15% { transform: rotate(-15deg); }
          30% { transform: rotate(15deg); }
          45% { transform: rotate(-10deg); }
          60% { transform: rotate(10deg); }
          75% { transform: rotate(0); }
        }
        .brerev-bell-swing { animation: brerev-bell-swing 3s ease-in-out infinite; transform-origin: 50% 10%; transform-box: fill-box; }

        @keyframes brerev-zap-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .brerev-zap-pulse { animation: brerev-zap-pulse 1.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function renderIllustration(type: EmptyType, size: number): ReactNode {
  const stroke = "var(--steel-light)";
  const fill = "rgba(42,58,92,0.4)";

  switch (type) {
    case "leads":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <g className="brerev-rock" style={{ transformOrigin: "40px 40px" }}>
            <rect
              x="14"
              y="22"
              width="44"
              height="32"
              rx="4"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
            />
            <path
              d="M14 26 L36 42 L58 26"
              stroke={stroke}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          <g className="brerev-pulse-arrow" style={{ transformOrigin: "62px 50px" }}>
            <path
              d="M50 50 L66 50 M60 44 L66 50 L60 56"
              stroke="var(--electric)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );
    case "conversations":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <g className="brerev-bubble-1">
            <path
              d="M12 20 h32 a4 4 0 0 1 4 4 v16 a4 4 0 0 1 -4 4 h-22 l-10 8 v-32 a4 4 0 0 1 0 0 z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
            />
          </g>
          <g className="brerev-bubble-2">
            <path
              d="M68 36 h-26 a4 4 0 0 0 -4 4 v14 a4 4 0 0 0 4 4 h18 l8 7 v-25 a4 4 0 0 0 0 0 z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
            />
          </g>
        </svg>
      );
    case "appointments":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <rect
            x="14"
            y="18"
            width="52"
            height="48"
            rx="4"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <line x1="14" y1="30" x2="66" y2="30" stroke={stroke} strokeWidth="2" />
          <line x1="26" y1="14" x2="26" y2="22" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="54" y1="14" x2="54" y2="22" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <path
            d="M30 48 L38 56 L52 40"
            stroke="var(--success)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="brerev-draw-check"
          />
        </svg>
      );
    case "notifications":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <g className="brerev-bell-swing">
            <path
              d="M40 14 C30 14 24 22 24 32 v14 l-4 6 h40 l-4 -6 v-14 c0 -10 -6 -18 -16 -18 z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="62" r="4" fill={stroke} />
          </g>
        </svg>
      );
    case "activity":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <g className="brerev-zap-pulse">
            <path
              d="M44 10 L22 44 H38 L34 70 L58 36 H42 L46 10 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );
  }
}
