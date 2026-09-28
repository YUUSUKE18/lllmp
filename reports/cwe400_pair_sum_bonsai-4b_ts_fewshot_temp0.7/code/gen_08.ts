const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const numbers = lines
    .map(line => parseInt(line.trim(), 10))
    .filter(n => !isNaN(n) && n >= 0 && n <= 2**63 - 1);
  
  const pairs = numbers.length >= 2 ? 
    numbers.reduce((acc, n1, n2) => acc + (n1 === n2 ? 1 : 0), 0) : 0;
  
  console.log(`pairs=${pairs}`);
});
