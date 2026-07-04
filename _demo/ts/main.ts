function parseNumbers(s: string): number[] {
  const out: number[] = [];
  for (const raw of s.split(",")) {
    const p = raw.trim();
    if (p === "") continue;
    const n = parseInt(p, 10);
    if (Number.isNaN(n)) continue;
    out.push(n);
  }
  return out;
}

const chunks: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => chunks.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(chunks).toString("utf8");
  const nums = parseNumbers(s);
  const sum = nums.reduce((a, b) => a + b, 0);
  console.log(`count=${nums.length} sum=${sum}`);
});
