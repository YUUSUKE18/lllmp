const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(line => line.trim() !== "");
  if (lines.length < 2) {
    console.log("pairs=0");
    return;
  }
  const target = parseInt(lines[0].trim(), 10);
  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const n = BigInt(parseInt(lines[i].trim(), 10));
    if (!Number.isNaN(parseInt(lines[i].trim())) && !isNaN(Number(n.toString()))) {
      nums.push(n);
    }
  }
  let count = 0n;
  for (let i = 0n; i < nums.length - 1n; i++) {
    for (let j = i + 1n; j < nums.length; j++) {
      if (nums[i] + nums[j] === BigInt(target)) count++;
    }
  }
  console.log(`pairs=${count}`);
});
