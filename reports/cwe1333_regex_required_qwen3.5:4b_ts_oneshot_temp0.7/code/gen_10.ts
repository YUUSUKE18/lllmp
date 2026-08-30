const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    if (!line.trim()) continue;
    const pattern = /^\s*(?:\d+(?:,\d*)?)\s*$/;
    if (pattern.test(line)) {
      count++;
    }
  }
  console.log(`valid=${count}`);
});
