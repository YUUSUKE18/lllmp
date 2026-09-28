const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  if (isNaN(target)) {
    console.log("pairs=0");
    return;
  }
  let count = 0;
  const nums = s.split(/\s+/).map((n) => {
    if (!n.trim()) return null;
    const num = parseInt(n, 10);
    if (Number.isNaN(num)) return null;
    return num;
  }).filter(n => n !== null);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
        break;
      }
    }
  }
  console.log(`pairs=${count}`);
});
