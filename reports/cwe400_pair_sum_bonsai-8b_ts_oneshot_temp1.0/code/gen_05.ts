const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  const target = lines[0].trim();
  const nums = lines.slice(1).map(line => line.trim()).filter(line => !line);
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const n1 = parseInt(nums[i], 10);
    if (Number.isNaN(n1)) continue;
    for (let j = i + 1; j < nums.length; j++) {
      const n2 = parseInt(nums[j], 10);
      if (Number.isNaN(n2)) continue;
      if (n1 + n2 === target) count++;
    }
  }
  console.log(`pairs=${count}`);
});
