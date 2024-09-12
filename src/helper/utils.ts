export function getTime() {
  const time = new Date().toLocaleTimeString();
  return time;
}

export function generateRandomInteger() {
  return Math.random() * 100_000_000;
}
