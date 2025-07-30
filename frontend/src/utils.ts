export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(array: readonly T[]): T[] {
  const newArray = [...array];
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = newArray[m];
    newArray[m] = newArray[i];
    newArray[i] = t;
  }

  return newArray;
}
