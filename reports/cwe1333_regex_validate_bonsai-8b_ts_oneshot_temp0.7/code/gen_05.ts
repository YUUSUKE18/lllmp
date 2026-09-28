const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0, currentLine = "";
  for (const line of s.split("\n")) {
    line = line.trim();
    if (!line) continue;
    if (/^[0-9,]+$/.test(line)) {
      const parts = line.split(",");
      let count = 0;
      for (const part of parts) {
        if (part.trim()) count++;
      }
        if (count > 1) valid++;
      currentLine = "";
    } else {
      currentLine = "";
    }
  }
  console.log(`valid=${valid}`);
});
