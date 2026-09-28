const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;

  const target = parseInt(s.substring(0, s.indexOf('\n')), 10);
  if (isNaN(target)) {
    console.log(`pairs=0`);
    return;
  }

  let nums: number[] = [];
  for (let i = 1; i < lines + 1; i++) {
    const line = s.substring(i).split("\n").filter(_ => _ !== "").join("\n");
    const val = parseInt(line, 10);
    if (!isNaN(val)) {
      nums.push(val);
    }
  }

  let count = 0;
  const seen: Set<number> = new Set();
  for (const n of nums) {
    const complement = target - n;
    if (seen.has(complement)) {
      count++;
    }
    seen.add(n);
  }

  console.log(`pairs=${count}`);
});
