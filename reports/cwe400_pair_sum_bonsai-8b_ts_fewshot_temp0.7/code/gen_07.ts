const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/);
  const target = parseInt(lines[0], 10);
  const nums = lines.slice(1).map(line => {
    const numStr = line.trim();
    if (!numStr || isNaN(parseInt(numStr, 10))) return null;
    return parseInt(numStr, 10);
  }).filter(n => n !== null);
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
