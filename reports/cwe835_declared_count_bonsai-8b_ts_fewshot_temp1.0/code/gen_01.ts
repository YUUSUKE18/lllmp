const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/).filter(Boolean).map(line => line.trim());
  let count = 0, sum = 0;
  for (const line of lines) {
    const numStr = line.match(/\d+/);
    if (numStr) {
      const num = parseInt(numStr[0], 10);
      if (!isNaN(num)) {
        count++;
        sum += num;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
