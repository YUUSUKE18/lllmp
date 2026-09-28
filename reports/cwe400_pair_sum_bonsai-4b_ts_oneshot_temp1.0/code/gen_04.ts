const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(process.stdin.readline().trim(), 10);
  const pairs = 0;
  const numbers: Buffer[] = s.split(/\s+/);
  for (let i = 0; i < numbers.length; i++) {
    const n = parseInt(numbers[i], 10);
    if (isNaN(n)) continue;
    if (n === goal) {
      const found = i + 1;
      const pairs = 0;
      for (let j = i + 1; j < numbers.length; j++) {
        const m = parseInt(numbers[j], 10);
        if (m === goal) {
          pairs++;
        }
      }
    }
  }
  console.log(`pairs=${pairs}`);
});
