const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let line = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\n") {
      if (line.trim()) {
        const n = parseInt(line, 10);
        if (!Number.isNaN(n)) {
          count++;
          sum += n;
        }
      }
      line = "";
    } else {
      line += s[i];
    }
  }
  if (line.trim()) {
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
