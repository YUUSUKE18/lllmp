const map = new Map<number, number>();
let total = 0;

process.stdin.on("data", (c: Buffer) => {
  const s = c.toString().trim();
  if (!s) return;
  
  let n: number | null = null;
  try {
    n = parseInt(s);
  } catch (_) {}
  
  if (n !== null && !isNaN(n)) {
    const steps = getSteps(n);
    total += steps;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});

function getSteps(n: number): number {
  if (n === 1) return 0;
  if (map.has(n)) return map.get(n)!;
  
  let steps = 0;
  let curr = n;
  
  while (curr !== 1) {
    if (curr % 2 === 0) {
      curr = curr / 2;
    } else {
      curr = 3 * curr + 1;
    }
    steps++;
  }
  
  map.set(n, steps);
  return steps;
}
