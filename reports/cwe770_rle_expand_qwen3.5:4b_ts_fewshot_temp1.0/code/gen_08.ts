const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const p of s.split(",")) {
    if (!p.includes(":")) continue;
    const trimmed = p.trim();
    const parts = trimmed.split(/:?/);
    if (parts.length !== 2) continue;
    const key = BigInt(parts[0].trim());
    const times = BigInt(parts.slice(1).join(":").trim()); // Handle potential nested colons if any, though spec implies simple colon
    count += key * times;
  }
  console.log(`count=${countn} sum=${sum}`);
});
