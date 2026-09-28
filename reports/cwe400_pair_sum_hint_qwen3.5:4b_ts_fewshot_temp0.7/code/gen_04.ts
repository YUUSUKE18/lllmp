const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  
  const targetLine = s.split("\n")[0];
  let target: bigint = 0n;
  try {
    target = BigInt(targetLine.trim());
  } catch {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines; i++) {
    const line = s.split("\n")[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (Number.isFinite(n)) nums.push(n);
  }

  let pairs = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === target) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
});
