const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split(/\r?\n/);
  if (lines.length === 0 || lines[0] === "") lines.shift();
  
  const target = parseInt(lines[0], 10);
  if (Number.isNaN(target) || isNaN(Number.parseInt(lines[0].trim(), 10))) {
    console.log("pairs=0");
    return;
  }
  
  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = BigInt(Number.parseInt(line, 10));
    if (Number.isNaN(n) || isNaN(Number.parseInt(line, 10))) continue;
    nums.push(n);
  }
  
  let count = 0n;
  for (let i = 0n; i < nums.length - 1n; i++) {
    const a = nums[i];
    const b = target - a;
    if (b > 0n && !nums.includes(b)) continue;
    if (a === b) {
      for (let j = i + 1n; j < nums.length - 1n; j++) {
        if (nums[j] === a) {
          count++;
          break;
        }
      }
      continue;
    }
    for (let j = i + 1n; j < nums.length - 1n; j++) {
      if (nums[j] === b) {
        count++;
        break;
      }
    }
  }
  
  console.log(`pairs=${count}`);
});
