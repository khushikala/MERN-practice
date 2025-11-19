import { useState, useEffect } from "react";

function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));
  }, []);

  if (online) return null;
  return <div style={{ background: "yellow" }}>You are offline</div>;
}

export default OfflineBanner;
