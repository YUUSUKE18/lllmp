const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validLines = 0;

  for (const line of lines) {
    if (line.trim() === "") continue;
    
    const regex = /^\s*(\d+(?:,\s*\d+)*)\s*$/;
    if (regex.test(line)) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
