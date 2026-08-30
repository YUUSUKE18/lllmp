const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  if (!s) {
    console.log("pairs=0");
    return;
  }
  const lines = s.split(/\r?\n/);
  const target: bigint = BigInt(parseInt(lines[0], 10));
  const nums: bigint[] = [];
  for (const line of lines.slice(1)) {
    if (line.trim() === "") continue;
    try {
      const n = parseInt(line, 10);
      if (Number.isNaN(n)) continue;
      nums.push(BigInt(n));
    } catch {
      continue;
    }
  }
  let count: bigint = 0n;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
