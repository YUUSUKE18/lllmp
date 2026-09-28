const memo = new Map<number, number>();
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines = s.split(/\s+/).filter(f => f.trim() !== "");
  
  for (const nStr of lines) {
    const n = parseInt(nStr, 10);
    if (isNaN(n)) continue;
    
    let steps = 0;
    if (n === 1) {
      steps = 0;
    } else if (n % 2 === 0) {
      let current = n / 2;
      while (current !== 1) {
        if (memo.has(current)) {
          steps = memo.get(current);
          break;
        }
        memo.set(current, steps + 1);
        current = current / 2;
        steps++;
      }
    } else {
      let current = 3 * n + 1;
      while (current !== 1) {
        if (memo.has(current)) {
          steps = memo.get(current);
          break;
        }
        memo.set(current, steps + 1);
        current = (current % 4 === 0) ? current / 4 : (current % 8 === 0) ? current / 8 : current + 6;
        steps++;
      }
    }
    total += steps;
  }
  console.log(`total=${total}`);
});
