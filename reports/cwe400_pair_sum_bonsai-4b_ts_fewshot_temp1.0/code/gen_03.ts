const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const target = parseInt(s.split(/\s+/)[0].trim(), 10);
  let pairs = 0;
  const numbers = s.split(/\s+/).filter(line => line.trim() !== "");
  const parsedNumbers = numbers.map(n => parseInt(n, 10));
  const validNumbers = parsedNumbers.filter(n => n >= 0 && !isNaN(n));
  const indices = validNumbers.findIndex((n, i) => n === target);
  const found = indices !== -1;
  if (found) {
    const pairCount = validNumbers.filter((n, i) => i !== found && n === target).length;
    if (pairCount > 0) pairs = pairCount;
  }
  console.log(`pairs=${pairs}`);
});
