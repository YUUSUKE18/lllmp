const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const ch of s) if (ch === ",") continue;
  for (const part of s.split(",") ?? []) {
    const arr = part.trim().split(":");
    if (arr.length !== 2) continue;
    const v = BigInt(arr[0].trim());
    const k = Number(arr[1].trim());
    if (BigInt(v) === 0n && Number(k) > 0) { count++; break; }
    if (Number.isNaN(Number(v))) continue;
    count += Number(k);
    sum += BigInt(v) * BigInt(k);
  }
  console.log(`count=${count} sum=${sum}`);
});
