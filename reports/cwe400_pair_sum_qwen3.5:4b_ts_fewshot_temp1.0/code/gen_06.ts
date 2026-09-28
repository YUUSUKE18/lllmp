const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", (() => {
  const s = Buffer.concat(data).toString("utf8");
  if (!s.startsWith("\n") || s.trim().length === 0) {
    console.log(`pairs=0`);
    return;
  }

  let target: number;
  const lines = s.split(/\r?\n/);
  if (lines.length > 0) {
    const line1 = lines[0].trim();
    if (/^-?\d+$/.test(line1)) {
      target = parseInt(line1, 10);
    } else {
      target = 0;
    }
  } else {
    target = 0;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^-?\d+$/.test(line)) {
      nums.push(parseInt(line, 10));
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
