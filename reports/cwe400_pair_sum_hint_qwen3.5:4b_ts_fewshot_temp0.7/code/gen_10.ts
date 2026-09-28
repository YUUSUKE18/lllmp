const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = null;
  if (lines[0].trim() !== "") {
    const n = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(n)) target = n;
  }

  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    try {
      const n = BigInt(parseInt(line.trim(), 10));
      if (!Number.isNaN(Number(n))) nums.push(n);
    } catch (e) {}
  }

  let count = 0n;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }

  console.log(`pairs=${count}`);
});
