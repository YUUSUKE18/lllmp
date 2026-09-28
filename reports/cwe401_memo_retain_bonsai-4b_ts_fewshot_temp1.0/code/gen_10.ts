const data: Buffer[] = [];
let memo: Map<number, number> = new Map();

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === " ") continue;
    const n = parseInt(ch, 10);
    if (isNaN(n)) continue;
    if (memo.has(n)) {
      const result = memo.get(n);
      if (n % 2 === 0) {
        memo.set(n, result / 2);
      } else {
        memo.set(n, result + 3 * n);
      }
    } else {
      memo.set(n, 0);
      if (n % 2 === 0) {
        memo.set(n, memo.get(n / 2) || 0);
      } else {
        memo.set(n, memo.get(n) || 0 + 3 * n);
      }
    }
    const current = memo.get(n);
    if (current === undefined) {
      let result = 0;
      if (n % 2 === 0) {
        result = n / 2;
      } else {
        result = 3 * n + 1;
      }
      // 1 に到達するまでの手数を計算
      let steps = 0;
      let temp = n;
      while (temp > 1) {
        if (temp % 2 === 0) {
          temp = temp / 2;
        } else {
          temp = 3 * temp + 1;
        }
        steps++;
      }
      memo.set(n, steps);
    }
  }
  total += memo.values().reduce((sum, v) => sum + (v !== undefined ? v : 0), 0);
  console.log(`total=${total}`);
});
