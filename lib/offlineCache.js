export function setCachedData(key, data) {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (err) {
    console.error("Error writing offline cache:", err);
  }
}


export function getCachedData(key) {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item).data : null;
  } catch (err) {
    console.error("Error reading offline cache:", err);
    return null;
  }
}