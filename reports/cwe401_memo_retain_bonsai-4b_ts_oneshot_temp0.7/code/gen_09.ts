const data: Buffer[] = [];
let memo: Map<number, number> = new Map();
const total = 0;

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\r|\n/).filter(line => line.trim() !== "");
  for (const line of lines) {
    if (!/^\s*$/.test(line)) {
      const n = parseInt(line, 10);
      if (isNaN(n)) continue;
      if (memo.has(n)) continue;
      memo.set(n, 0);
      let x = n;
      let steps = 0;
      while (x !== 1) {
        if (x % 2 === 0) x = x / 2;
        else x = 3 * x + 1;
        steps++;
        if (memo.has(x)) break;
        if (x > 2**31) break; // 64bit で収まります
      }
      if (memo.has(x)) memo.set(x, steps);
      total += steps;
    }
  }
});
console.log(`total=${total}`);
