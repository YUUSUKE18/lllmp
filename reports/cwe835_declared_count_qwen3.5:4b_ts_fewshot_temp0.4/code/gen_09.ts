const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = BigInt(0);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    if (i === 0) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) count = n;
    } else {
      for (const ch of line) {
        if (ch >= "0" && ch <= "9") {
          sum += BigInt(ch.charCodeAt(0) - 48);
          count++;
        }
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
