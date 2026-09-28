const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = 0, first = true, count = 0;
  for (let i = 0; i < s.length; i += 10) {
    const line = s.substring(i, i + 10).trim();
    if (!line) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    if (first) { first = false; target = n; } else if (n === target) { count += 1; } else if (n < target) { first = true; target = n; }
  }
  console.log(`pairs=${count}`);
});
