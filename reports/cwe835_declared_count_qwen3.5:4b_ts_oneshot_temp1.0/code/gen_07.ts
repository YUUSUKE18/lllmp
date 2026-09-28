const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split(/\r?\n/);
  
  let countInput: number | undefined;
  let actualCount = 0;
  let sum = BigInt(0);

  for (const line of lines) {
    if (!line || line.trim() === "") continue;
    
    const parts = line.split(/\s+/);
    if (parts.length > 0 && /^\d+$/.test(parts[0])) {
      countInput = parseInt(parts[0], 10);
      break;
    }
  }

  if (countInput === undefined) {
    console.log(`count=0 sum=0`);
    return;
  }

  let currentVal: BigInt | null = null;
  for (let i = lines.length - 1; i >= 0; i--) {
    const lineContent = lines[i];
    if (!lineContent.trim()) continue;
    
    const nums = lineContent.split(/\s+/).map(x => parseInt(x, 10));
    if (nums.length === 0) continue;

    // If it's the first row (after count), treat as value rows.
    // Otherwise, if any non-integer content is found, it might be mixed data.
    // Based on spec: "2 行目以降に整数が 1 行に 1 個ずつ並びます" (Each integer per line).
    // So we look for the first row that looks like an integer list.
    
    const isIntegerRow = nums.every(n => !isNaN(n));
    if (isIntegerRow && i > 0) {
      for (const num of nums) {
        sum += BigInt(num);
        actualCount++;
      }
    }
    else if (i === lines.length - 1) {
      // The first row is count input, so the last row is data.
      // We need to handle it correctly.
      if (isIntegerRow) {
        for (const num of nums) {
          sum += BigInt(num);
          actualCount++;
        }
      }
    }
  }

  console.log(`count=${actualCount} sum=${sum.toString()}`);
});
