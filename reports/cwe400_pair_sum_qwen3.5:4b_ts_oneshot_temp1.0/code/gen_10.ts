const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(line => line.trim() !== "");
  if (lines.length < 2) {
    console.log("pairs=0");
    return;
  }

  const targetStr = lines[0].trim();
  let pairs = 0;
  const n = parseInt(targetStr, 10);

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.trim().split(/\s+/).filter(p => p !== "");
    if (parts.length === 0) continue;
    const numVal = parseInt(parts[parts.length - 1], 10);
    if (Number.isNaN(numVal)) continue;
    nums.push(numVal);
  }

  let hasSeen: Set<number> = new Set();
  for (const x of nums) {
    const required = n - x;
    if (hasSeen.has(required)) {
      pairs++;
    }
    hasSeen.add(x);
  }

  console.log(`pairs=${pairs}`);
});
