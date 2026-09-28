const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(Boolean);
  const firstLine = lines[0];
  const count = 0;
  const sum = 0;
  for (const line of lines) {
    const numbers = line.split(/\s+/);
    for (const num of numbers) {
      if (num.trim() === "") continue;
      const n = parseInt(num, 10);
      if (Number.isNaN(n)) continue;
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
