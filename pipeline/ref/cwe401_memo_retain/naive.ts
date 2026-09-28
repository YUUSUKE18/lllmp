// 素朴実装: 経路上のすべての中間値をメモ化する（CWE-401: 保持し続けて解放しない）。
const memo = new Map<number, number>();

function steps(n: number): number {
  const path: number[] = [];
  let cur = n;
  let extra = 0;
  while (cur !== 1) {
    const hit = memo.get(cur);
    if (hit !== undefined) { extra = hit; break; }
    path.push(cur);
    cur = cur % 2 === 0 ? cur / 2 : 3 * cur + 1;
  }
  for (let i = path.length - 1; i >= 0; i--) {
    extra++;
    memo.set(path[i], extra);   // 中間値をすべて覚える
  }
  return extra;
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
