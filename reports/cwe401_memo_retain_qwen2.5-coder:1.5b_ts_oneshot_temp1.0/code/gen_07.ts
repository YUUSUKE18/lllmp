function computeCollatz(n: number, memo: Map<number, number>): number {
  if (memo.has(n)) return memo.get(n)!;

  let count = 1;
  let nextN = n;

  while (nextN !== 1) {
    nextN = nextN % 2 === 0 ? nextN / 2 : 3 * nextN + 1;
    count++;
    memo.set(nextN, count);
  }

  return count;
}

const memo = new Map<number, number>();

let total = 0;

process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).filter(n => n.trim() !== "" && Number.isInteger(parseInt(n, 10)));

  for (const number of numbers) {
    total += computeCollatz(parseInt(number, 10), memo);
  }

  console.log(`total=${total}`);
});
