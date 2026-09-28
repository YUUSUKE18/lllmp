let memo = new Map<string, number>();
function calculateSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;

  const steps = calculateSteps(n % 2 === 0 ? n / 2 : 3 * n + 1);
  memo.set(n.toString(), steps + 1);
  return steps + 1;
}

let totalSteps = 0;
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let first = true;
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    const steps = calculateSteps(n);
    totalSteps += steps;
    if (!first) console.log();
    console.log(`n=${n}, steps=${steps}`);
    first = false;
  }
  console.log(`total=${totalSteps}`);
});
