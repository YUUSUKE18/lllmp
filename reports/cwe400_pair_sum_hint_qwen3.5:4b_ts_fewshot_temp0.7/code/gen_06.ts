const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  
  const targetLine = lines > 0 ? s.substring(0, lines).trim() : "";
  const targetVal: bigint | null = targetLine.trim() === "" ? null : BigInt(targetLine);
  
  if (targetVal === null) {
    console.log("pairs=0");
    return;
  }

  const values: number[] = [];
  let valueCount = 0;
  
  for (let i = lines + 1; i < s.length && i >= 0; i++) {
    if (i + 1 >= s.length) break;
    const line = s.substring(i, i + 1); // Get the next character to check for newline
    if (line === "\n") continue;
    
    // Check if there's more content after this line before newline or end
    let j = i + 1;
    while (j < s.length && s[j] !== "\n") j++;
    const nextLine = s.substring(i, j);
    
    const trimmed = nextLine.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    values.push(n);
    valueCount++;
    i = j - 1; // Move to after the newline
  }

  let pairs = 0n;
  const seen: Set<number> = new Set();
  
  for (const val of values) {
    const needed = targetVal - BigInt(val);
    if (seen.has(Number(needed))) {
      pairs++;
    }
    seen.add(val);
  }

  console.log(`pairs=${pairs}`);
});
