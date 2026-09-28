const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  if (s.trim() === "") {
    console.log(`pairs=0`);
    return;
  }
  const lines = s.trim().split(/\r?\n/);
  const target = parseInt(lines[0].trim(), 10);
  if (Number.isNaN(target)) {
    console.log(`pairs=0`);
    return;
  }
  const nums: number[] = [];
  for (const l of lines.slice(1)) {
    const n = parseInt(l.trim(), 10);
    if (!Number.isNaN(n) && isFinite(n)) {
      nums.push(n);
    }
  }
  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
