const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0); // Using BigInt to ensure 64-bit integer handling
  for (const part of s.split(",")) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    
    // Validate format "値:回数"
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1 || colonIndex !== trimmed.lastIndexOf(":")) continue;

    const valueStr = trimmed.substring(0, colonIndex).trim();
    const countStr = trimmed.substring(colonIndex + 1).trim();

    // Check if both parts are non-empty
    if (valueStr === "" || countStr === "") continue;

    const value = parseInt(valueStr, 10);
    if (Number.isNaN(value)) continue;

    const itemCount = parseInt(countStr, 10);
    if (Number.isNaN(itemCount) || itemCount < 0) continue;

    count += itemCount;
    sum += BigInt(value) * BigInt(itemCount);
  }
  console.log(`count=${count} sum=${sum}`);
});
