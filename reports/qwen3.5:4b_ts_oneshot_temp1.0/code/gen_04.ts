const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = new Map<number, number>();
  let hasInput = false;

  for (const token of s.split(",")) {
    const trimmed = token.trim();
    if (trimmed === "") continue;
    
    const num = parseInt(trimmed, 10);
    if (Number.isNaN(num)) continue;
    
    hasInput = true;
    if (!numbers.has(num)) {
      numbers.set(num, 0);
    }
    numbers.set(num, numbers.get(num) + 1);
  }

  if (!hasInput) {
    console.log("count=0 sum=0");
    return;
  }

  let count = 0;
  let sum = BigInt(0); // Ensure BigInt to prevent overflow during accumulation

  for (const [num, c] of numbers.entries()) {
    count++;
    sum += BigInt(num) * BigInt(c);
  }

  console.log(`count=${count} sum=${Number(sum)}`);
});
