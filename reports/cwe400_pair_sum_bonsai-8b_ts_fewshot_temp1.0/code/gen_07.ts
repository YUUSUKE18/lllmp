const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  let chars = s.length;
  let first = true;
  let nums = [];
  for (let i = 1; i < lines; i++) {
    const line = s.slice(i, s.length).trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    nums.push(n);
  }
  let pairs = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === parseInt(s.split("\n")[1], 10)) pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
