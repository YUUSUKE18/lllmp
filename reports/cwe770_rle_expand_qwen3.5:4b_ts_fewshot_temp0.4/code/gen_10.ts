const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (!part.trim()) continue;
    const regex = /^(\d+):(\d+)$/.exec(part);
    if (!regex) continue;
    const val = BigInt(regex[1]);
    const times = BigInt(regex[2]);
    if (val < 0n || times < 0n) continue;
    count += Number(times);
    sum += val * times;
  }
  console.log(`count=${count} sum=${sum}`);
});
