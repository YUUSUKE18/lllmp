const cache = new Map<number, number>();
let total = 0;

function steps(n: number): number {
  if (n === 1) return 0;
  const key = n;
  if (cache.has(key)) return cache.get(key)!;

  let count = 0;
  while (n !== 1) {
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    count++;
  }
  cache.set(key, count);
  return count;
}

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let totalSum = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    const c = steps(n);
    totalSum += c;
  }
  console.log(`total=${totalSum}`);
});
