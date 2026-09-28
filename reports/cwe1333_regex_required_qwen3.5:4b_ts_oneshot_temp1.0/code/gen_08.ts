const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  for (const line of lines) {
    if (!line) continue;
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const re = /^[\d,\s]+$/;
    if (re.test(trimmed)) count++;
  }
  console.log(`valid=${count}`);
});
