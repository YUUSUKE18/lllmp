const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.trim().split(/\r?\n/);
  if (lines.length === 0 || !/^-\d+$/.test(lines[0])) {
    console.log(`pairs=0`);
    return;
  }
  const target = parseInt(lines[0], 10);
  const nums = [];
  for (const i of lines.slice(1)) {
    const n = parseInt(i, 10);
    if (!Number.isNaN(n) && !isNaN(parseInt(i.trim(), 10))) {
      nums.push(n);
    }
  }
  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
