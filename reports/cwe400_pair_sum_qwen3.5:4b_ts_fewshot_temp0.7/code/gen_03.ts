const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  if (lines === 0) { console.log(`pairs=0`); return; }

  const targetLine = s.split("\n")[1];
  const target = parseInt(targetLine, 10);
  if (Number.isNaN(target)) { console.log(`pairs=0`); return; }

  const nums: number[] = [];
  for (let i = 2; i < lines + 2; i++) {
    const line = s.split("\n")[i];
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    nums.push(n);
  }

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }

  console.log(`pairs=${count}`);
});
