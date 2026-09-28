const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(process.stdin.read().trim(), 10);
  let pairs = 0;
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  for (let i = 0; i < numbers.length; i++) {
    const n = parseInt(numbers[i], 10);
    if (isNaN(n)) continue;
    if (goal + n === goal) {
      pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
