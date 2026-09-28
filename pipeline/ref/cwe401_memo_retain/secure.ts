// 安全実装: メモ化はクエリされた値だけに限る。
const memo = new Map<number, number>();

function steps(n: number): number {
  const hit = memo.get(n);
  if (hit !== undefined) return hit;
  let cur = n;
  let c = 0;
  while (cur !== 1) {
    cur = cur % 2 === 0 ? cur / 2 : 3 * cur + 1;
    c++;
  }
  memo.set(n, c);
  return c;
}

const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  let total = 0;
  for (const raw of Buffer.concat(chunks).toString("utf8").split("\n")) {
    const line = raw.trim();
    if (line === "") continue;
    const n = Number(line);
    if (!Number.isInteger(n) || n < 1) continue;
    total += steps(n);
  }
  process.stdout.write(`total=${total}\n`);
});
