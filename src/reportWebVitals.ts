import { onCLS, onFID, onFCP, onLCP, onTTFB } from "web-vitals";

const reportWebVitals = (onPerfEntry?: () => void) => {
  if (!onPerfEntry) {
    return;
  }

  onCLS(onPerfEntry);
  onFID(onPerfEntry);
  onFCP(onPerfEntry);
  onLCP(onPerfEntry);
  onTTFB(onPerfEntry);
};

export default reportWebVitals;
