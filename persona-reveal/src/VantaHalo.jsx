import { useEffect, useRef } from "react";

export default function VantaHalo() {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const init = () => {
      if (!mounted) return;
      if (typeof window !== "undefined" && window.VANTA && ref.current) {
        if (vantaRef.current) {
          vantaRef.current.destroy();
        }
        vantaRef.current = window.VANTA.HALO({
          el: ref.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          xOffset: -0.04,
          yOffset: 0.20,
          size: 2.60
        });
      } else {
        setTimeout(init, 100);
      }
    };

    init();

    return () => {
      mounted = false;
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
