const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const numbers = lines
    .split(/\s+/)
    .filter(line => line.trim() !== "")
    .map(line => parseInt(line, 10) || 0);
  
  const pairs = numbers.filter((n, i) => n >= 0).filter((n, i) => i < numbers.length - 1);
  
  const pairCount = 0;
  for (let i = 0; i < numbers.length - 1; i++) {
    const a = numbers[i];
    const b = numbers[i + 1];
    if (a + b === goal) pairCount++;
  }
  
  console.log(`pairs=${pairCount}`);
});
