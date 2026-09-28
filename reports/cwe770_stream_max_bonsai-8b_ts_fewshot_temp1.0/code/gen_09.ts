const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,/);
  let count = 0, max = -Infinity;
  for (const el of elements) {
    const trimmed = el.trim();
    if (trimmed === "") continue;
    const num = parseInt(trimmed, 10);
    if (Number.isNaN(num)) continue;
    count++;
    if (num > max) max = num;
  }
  console.log(`count=${count} max=${max}`);
});
