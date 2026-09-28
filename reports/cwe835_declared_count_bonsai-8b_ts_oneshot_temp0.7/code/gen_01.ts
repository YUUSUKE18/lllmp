const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const count = 0;
  let sum = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    const numbers = line.split(/\s+/);
    for (const num of numbers) {
      const n = parseInt(num, 10);
      if (!Number.isNaN(n)) {
        count++;
        sum += n;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
