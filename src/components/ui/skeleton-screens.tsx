// Skeleton screens universales — reemplazan spinners genéricos.
// Estructura idéntica al contenido real para evitar layout shift.

import type { CSSProperties } from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 8,
  className,
  style,
}: Props) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background:
          "linear-gradient(90deg, rgba(30,45,79,0.6) 0%, rgba(42,58,92,0.85) 50%, rgba(30,45,79,0.6) 100%)",
        backgroundSize: "200% 100%",
        animation: "brerev-shimmer 1.5s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export function SkeletonKPICard() {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      aria-busy="true"
      aria-label="Cargando KPIs"
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-[14px] p-5"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            minHeight: 100,
          }}
        >
          <div className="flex items-center justify-between">
            <Skeleton width={36} height={36} borderRadius="50%" />
            <Skeleton width="40%" height={12} />
          </div>
          <div className="mt-3">
            <Skeleton width="40%" height={32} />
            <div className="mt-3">
              <Skeleton width="80%" height={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonLeadRow() {
  return (
    <div
      className="flex items-center gap-4 px-4 py-4"
      style={{
        borderBottom: "1px solid var(--steel)",
        height: 64,
      }}
    >
      <Skeleton width={36} height={36} borderRadius="50%" />
      <div className="flex-1">
        <Skeleton width="35%" height={14} />
        <div className="mt-1.5">
          <Skeleton width="55%" height={11} />
        </div>
      </div>
      <Skeleton width={70} height={22} borderRadius={11} />
      <Skeleton width={60} height={14} />
    </div>
  );
}

export function SkeletonConversationCard() {
  return (
    <div
      className="flex items-center gap-3 rounded-[10px] p-3"
      style={{ height: 72, background: "var(--card-bg)" }}
    >
      <Skeleton width={40} height={40} borderRadius="50%" />
      <div className="flex-1">
        <div className="mb-1.5 flex items-center justify-between">
          <Skeleton width="40%" height={13} />
          <Skeleton width={36} height={10} />
        </div>
        <Skeleton width="80%" height={11} />
      </div>
    </div>
  );
}

export function SkeletonFeedItem() {
  return (
    <div className="flex items-center gap-3" style={{ height: 56 }}>
      <Skeleton width={8} height={8} borderRadius="50%" />
      <div className="flex-1">
        <Skeleton width="70%" height={13} />
        <div className="mt-1.5">
          <Skeleton width="35%" height={10} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonChart() {
  // Bars with varying heights to simulate a chart
  const heights = [40, 65, 35, 80, 55, 70, 45, 90, 60, 75, 50, 85];
  return (
    <div
      className="rounded-[14px] p-5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
        height: 280,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <Skeleton width="35%" height={16} />
        <Skeleton width={100} height={28} borderRadius={14} />
      </div>
      <div className="flex h-[200px] items-end gap-2">
        {heights.map((h, i) => (
          <Skeleton
            key={i}
            width="100%"
            height={`${h}%`}
            borderRadius="4px 4px 0 0"
          />
        ))}
      </div>
    </div>
  );
}
