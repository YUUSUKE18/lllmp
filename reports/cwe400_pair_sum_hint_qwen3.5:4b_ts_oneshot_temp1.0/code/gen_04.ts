const input: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => input.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(input).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: bigint = 0n;
  if (lines[0].trim() === "") {
    console.log("pairs=0");
    return;
  }
  try {
    target = BigInt(lines[0].trim());
  } catch {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    try {
      const n = parseInt(line, 10);
      if (Number.isNaN(n)) continue;
      nums.push(n);
    } catch {
      continue;
    }
  }

  let count = 0n;
  for (let i = 0; i < nums.length - 1; i++) {
    const a = BigInt(nums[i]);
    for (let j = i + 1; j < nums.length; j++) {
      const b = BigInt(nums[j]);
      if (a + b === target) count++;
    }
  }

  console.log(`pairs=${count}`);
});
