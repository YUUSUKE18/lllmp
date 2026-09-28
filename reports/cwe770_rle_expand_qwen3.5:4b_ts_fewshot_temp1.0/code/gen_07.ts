const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  let parts: string[] = [];
  for (const char of s) if (char === ",") { parts.push(char); }
  const cleaned = parts.map((p, i) => p === "," ? "" : s.slice(i, i + p.length));
  if (cleaned[0] !== "") { count += BigInt(parseInt(cleaned[0], 10)); sum += BigInt(parseFloat(cleaned[0])) * BigInt(1); }
  const items: string[] = [];
  for (const w of s.split(",")) {
    if (w.trim() === "" || !/^(\d+):(\d+)$/.test(w.trim())) continue;
    const [val, times] = w.trim().split(":");
    count += BigInt(parseInt(times, 10));
    sum += BigInt(parseInt(val, 10)) * BigInt(parseInt(times, 10));
  }
  console.log(`count=${count} sum=${sum}`);
});
