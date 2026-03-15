export default function Loader() {
  return (
    <div className="relative w-5 h-5 animate-spin">
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-(--terciary-grey)"
          style={{
            transform: `rotate(${i * 45}deg) translate(6px)`,
            transformOrigin: "0 0",
            animation: `fadePulse 1s linear ${i * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function ProgressDonut({
  progress = null,
}: {
  progress: number | null;
}) {
  const angle = progress !== null ? (progress / 100) * 360 : 0;

  return (
    <div className="w-full h-80 justify-center items-center feature-container-vertical">
      <div
        className="grid place-items-center w-32 h-32 rounded-full"
        style={{
          background: `conic-gradient(rgb(59, 130, 246) ${angle}deg, transparent 0)`,
        }}
      >
        <div className="w-30 h-30 bg-(--terciary-grey) rounded-full grid place-items-center text-center text-(--primary-blue)">
          <div>
            <div style={{ fontStyle: "italic", fontSize: "13px" }}>
              progress
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              {progress !== null && `${progress}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
