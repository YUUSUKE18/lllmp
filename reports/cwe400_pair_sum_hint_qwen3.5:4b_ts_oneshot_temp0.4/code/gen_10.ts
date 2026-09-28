const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  const nums: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    if (target === null) {
      const n = parseInt(trimmed, 10);
      if (!Number.isNaN(n)) target = n;
    } else {
      const n = parseInt(trimmed, 10);
      if (!Number.isNaN(n)) nums.push(n);
    }
  }

  if (target === null || nums.length < 2) {
    console.log("pairs=0");
    return;
  }

  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
