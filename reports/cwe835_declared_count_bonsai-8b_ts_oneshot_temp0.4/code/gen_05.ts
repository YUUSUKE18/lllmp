const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const countStr = lines[0].trim();
  let count = 0, sum = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const numStr = line;
    if (/^-?\d+$/.test(numStr)) {
      const num = parseInt(numStr, 10);
      if (num >= -9007199254740991 && num <= 9007199254740991) {
        count++;
        sum += num;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
