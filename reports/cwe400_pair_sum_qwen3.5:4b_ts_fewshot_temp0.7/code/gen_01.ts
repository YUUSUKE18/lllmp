const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      target = parsed;
      break;
    }
  }
  const nums: number[] = [];
  for (let i = lines.length - 1; i >= 0; i--) { // Reverse to match problem description order
    const line = lines[i];
    if (line.trim() === "") continue;
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      nums.push(parsed);
    }
  }

  let count = 0n;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
