const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let target: number | null = null;
  const nums: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const parts = line.split(/\s+/);
    const n = parseInt(parts[0], 10);
    if (Number.isNaN(n)) continue;

    if (target === null) {
      target = n;
    } else {
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
