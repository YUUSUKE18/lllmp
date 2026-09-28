const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      target = n;
      break;
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  let count = 0n;
  const targetBig = BigInt(target);

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === targetBig) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
