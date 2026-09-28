const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const target = lines[0].trim();
  const nums = lines.slice(1).filter(line => {
    const numStr = line.trim();
    if (!numStr || isNaN(Number(numStr))) return false;
    return Number(numStr) <= 0x8000000000000000 && Number(numStr) >= -0x8000000000000000;
  }).map(Number);
  const n = nums.length;
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
