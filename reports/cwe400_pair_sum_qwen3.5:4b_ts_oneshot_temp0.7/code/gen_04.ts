const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  if (!s.length) {
    console.log(`pairs=0`);
    return;
  }

  const lines = s.split(/\r?\n/);
  const targetStr = lines[0].trim();
  const target = parseInt(targetStr, 10);
  if (isNaN(target)) {
    console.log(`pairs=0`);
    return;
  }

  let nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    nums.push(BigInt(n));
  }

  const N = nums.length;
  let count = BigInt(0);

  for (let i = BigInt(0); i < N; i++) {
    for (let j = BigInt(i + 1); j < N; j++) {
      if (nums[i] + nums[j] === target) {
        count += BigInt(1);
      }
    }
  }

  console.log(`pairs=${count}`);
});
