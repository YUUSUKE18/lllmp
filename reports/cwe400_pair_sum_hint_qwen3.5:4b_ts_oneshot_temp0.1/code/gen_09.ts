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
      target = parseInt(trimmed, 10);
      if (Number.isNaN(target)) continue;
    } else {
      const n = parseInt(trimmed, 10);
      if (!Number.isNaN(n)) {
        nums.push(n);
      }
    }
  }

  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
