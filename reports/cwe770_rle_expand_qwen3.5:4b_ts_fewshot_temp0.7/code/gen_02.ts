const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (part.trim() === "") continue;
    const colonIndex = part.indexOf(":");
    if (colonIndex === -1) continue;
    const keyPart = part.slice(0, colonIndex).trim();
    const valPart = part.slice(colonIndex + 1).trim();
    if (!/^-?\d+$/.test(keyPart) || !/^-?\d+$/.test(valPart)) continue;
    const n = BigInt(parseInt(keyPart, 10));
    const m = parseInt(valPart, 10);
    if (isNaN(m) || m < 0) continue;
    count += BigInt(m);
    sum += n * BigInt(m);
  }
  console.log(`count=${count} sum=${sum}`);
});
