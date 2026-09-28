const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let pairs = 0;
  let goal = parseInt(process.stdin.readFileSync(0, "utf8")?.trim() || "0");
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  const parsedNumbers = numbers.map(n => {
    if (!/^\d+$/.test(n)) return null;
    const num = parseInt(n, 10);
    if (isNaN(num) || num < 0 || num > 2**63 - 1) return null;
    return num;
  });
  
  if (parsedNumbers.length < 2) return;
  
  for (let i = 0; i < parsedNumbers.length; i++) {
    for (let j = i + 1; j < parsedNumbers.length; j++) {
      if (parsedNumbers[i] + parsedNumbers[j] === goal) {
        pairs++;
      }
    }
  }
  
  console.log(`pairs=${pairs}`);
});
