const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/).filter(l => l.trim());
  let count = 0, sum = 0;
  for (const line of lines) {
    const nums = line.split(/\s+/).filter(n => n.trim() !== "");
    for (const num of nums) {
      const n = parseInt(num, 10);
      if (!Number.isNaN(n)) {
        count++;
        sum += n;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
