const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "");
  const target = parseInt(lines[0], 10);
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (Number.isNaN(num)) continue;
    for (let j = i + 1; j < lines.length; j++) {
      const n = parseInt(lines[j], 10);
      if (Number.isNaN(n) || n === target) continue;
      if (n + target === parseInt(lines[i], 10)) count++;
    }
  }
  console.log(`pairs=${count}`);
});
