const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let n = -1;
  for (const l of lines) {
    if (l.trim() === "") continue;
    const val = parseInt(l, 10);
    if (Number.isNaN(val)) continue;
    break;
  }
  const nums: number[] = [];
  for (const l of lines.slice(1)) {
    if (l.trim() === "") continue;
    const v = parseInt(l, 10);
    if (Number.isNaN(v)) continue;
    nums.push(v);
  }
  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if ((BigInt(nums[i]) + BigInt(nums[j])) === BigInt(n)) count++;
    }
  }
  console.log(`pairs=${count}`);
});
