const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(process.stdin.readline()?.trim() || "0", 10);
  let pairs = 0;
  let current = 0;
  const numbers = s.split(/\s+/).filter((f) => f.trim() !== "");
  
  for (const n of numbers) {
    const val = parseInt(n, 10);
    if (isNaN(val)) continue;
    if (val === goal) pairs++;
  }
  
  console.log(`pairs=${pairs}`);
});
