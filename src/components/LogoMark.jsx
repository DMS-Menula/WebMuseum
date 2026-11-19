export default function LogoMark({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="WebMuseum mark"
    >
      <rect width="64" height="64" rx="14" fill="#101010" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="13.25"
        fill="none"
        stroke="#2f2f2c"
        strokeWidth="1.5"
      />
      {/* W drawn as a network path */}
      <polyline
        points="13,20 21.5,44 32,25 42.5,44 51,20"
        fill="none"
        stroke="#D8FF3E"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* nodes */}
      {[
        [13, 20],
        [21.5, 44],
        [32, 25],
        [42.5, 44],
        [51, 20],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.4" fill="#F5F5F0" />
      ))}
    </svg>
  );
}
