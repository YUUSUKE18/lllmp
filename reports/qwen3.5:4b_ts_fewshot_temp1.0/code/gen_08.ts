const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = new Set<number>();
  let sum = 0n;
  for (const part of s.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    // Regular expression to check if the string is a valid integer (optional sign followed by digits)
    const re = /^-?\d+$/;
    if (!re.test(trimmed)) continue;
    
    const num = parseInt(trimmed, 10);
    if (Number.isNaN(num)) continue;
    
    numbers.add(num);
    sum += BigInt(num);
  }
  console.log(`count=${numbers.size} sum=${sum}`);
});
