const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let targetVal: number | null = null;
  if (lines.length > 0 && lines[0].trim() !== "") {
    const firstLine = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(firstLine)) {
      targetVal = firstLine;
    }
  }

  if (targetVal === null) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  let count = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === targetVal) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
