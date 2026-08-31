const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  const pattern = /(\d+):(\d+)/;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(s)) !== null) {
    const val = BigInt(parseInt(match[1], 10));
    const n = parseInt(match[2], 10);
    if (isNaN(n) || n < 0) continue;
    count += n;
    sum += val * BigInt(n);
  }
  console.log(`count=${count} sum=${sum}`);
});
