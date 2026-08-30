const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  const nums: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const parts = line.split(/\s+/);
    if (parts.length === 1) {
      const val = parseInt(parts[0], 10);
      if (!Number.isNaN(val)) {
        target = val;
      }
    } else {
      for (const part of parts) {
        const n = parseInt(part, 10);
        if (!Number.isNaN(n)) {
          nums.push(n);
        }
      }
    }
  }

  if (target === null || nums.length < 2) {
    console.log(`pairs=0`);
    return;
  }

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
