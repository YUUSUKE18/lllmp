const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const linesArr = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\n") {
      if (lines > 0 && lines < s.length - i) {
        linesArr.push(s.substring(i + 1, s.indexOf("\n", i + 1)));
      } else {
        linesArr.push(s.substring(i + 1));
      }
    }
  }
  const target = parseInt(linesArr[0].trim(), 10);
  if (isNaN(target)) {
    console.log(`pairs=0`);
    return;
  }
  const nums: number[] = [];
  for (let i = 1; i < linesArr.length; i++) {
    const n = parseInt(linesArr[i].trim(), 10);
    if (!isNaN(n)) {
      nums.push(n);
    }
  }
  let pairs = 0;
  const seen = new Set<number>();
  for (const num of nums) {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs++;
    }
    seen.add(num);
  }
  console.log(`pairs=${pairs}`);
});
