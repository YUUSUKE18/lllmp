const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  let nums: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    if (target === null) {
      target = parseInt(trimmed, 10);
    } else {
      const n = parseInt(trimmed, 10);
      if (!Number.isNaN(n)) {
        nums.push(n);
      }
    }
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
