const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\r\n|\n/);
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;
    if (validityCheck(trimmedLine)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});

function validityCheck(line: string): boolean {
  const pattern = /^\s*(?:\d+(?:,\s*\d+)*)+\s*$/;
  return pattern.test(line);
}
