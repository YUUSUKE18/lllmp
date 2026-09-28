const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(process.stdin.readline()?.trim() || "0", 10);
  let pairs = 0;
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  const parsed = numbers.map(f => parseInt(f, 10));
  const target = goal;
  
  for (let i = 0; i < parsed.length; i++) {
    const a = parsed[i];
    if (a === target) continue;
    for (let j = i + 1; j < parsed.length; j++) {
      const b = parsed[j];
      if (a === target && b === target) continue;
      if (a + b === target) {
        pairs++;
      }
    }
  }
  
  console.log(`pairs=${pairs}`);
});
