const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/).filter(Boolean);
  const firstLine = lines[0];
  const countStr = firstLine.trim();
  const count = 0;
  if (countStr && !isNaN(countStr)) count = parseInt(countStr, 10);
  const numbers = lines.slice(1).filter(line => {
    const numStr = line.trim();
    if (!numStr) return false;
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) return false;
    return num >= -9223372036854775808 && num <= 9223372036854775807;
  });
  const sum = numbers.reduce((a, b) => a + b, 0);
  console.log(`count=${count} sum=${sum}`);
});
