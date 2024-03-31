export function shuffle<T>(arr: Array<T>): Array<T> {
  const out: Array<T> = arr.concat();
  let currentIndex: number = out.length;

  while (currentIndex != 0) {
    let randomIndex: number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [out[currentIndex], out[randomIndex]] = [out[randomIndex], out[currentIndex]];
  }

  return out;
}
