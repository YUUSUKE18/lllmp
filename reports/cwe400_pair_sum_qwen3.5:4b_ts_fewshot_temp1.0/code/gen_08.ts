const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", (() => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  const pairs = new Set<string>();

  if (lines.length >= 2) {
    let target: number;
    try {
      target = parseInt(lines[0], 10);
    } catch {
      return;
    }
    const nums: number[] = [];
    for (let i = 1; i < lines.length; i++) {
      let n: number;
      try {
        n = parseInt(lines[i], 10);
      } catch {
        continue;
      }
      if (!Number.isNaN(n)) nums.push(n);
    }
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) pairs.add(`${i},${j}`);
      }
    }
    console.log(`pairs=${pairs.size}`);
  }
})();
