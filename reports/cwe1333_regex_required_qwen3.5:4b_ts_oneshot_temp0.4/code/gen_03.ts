const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const regex = /^\s*(\d+)(?:,\s*\d+)*\s*$/;
    if (regex.test(line)) {
      count++;
    }
  }
  console.log(`valid=${count}`);
});
