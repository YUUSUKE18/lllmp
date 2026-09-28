const lines: string[] = [];
let finished = false;
function end(): void {
  if (finished) return;
  finished = true;
  const s = lines.join("\n");
  const parts = s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (parts.length < 2 || !Number.isInteger(parseInt(parts[0], 10))) {
    console.log("pairs=0\n");
    return;
  }
  const target = parseInt(parts[0], 10);
  const nums: bigint[] = [];
  for (let i = 1; i < parts.length; i++) {
    const n = parseInt(parts[i], 10);
    if (!Number.isInteger(n)) continue;
    nums.push(BigInt(n));
  }
  let count = BigInt(0);
  const used = new Set<string>();
  for (let i = 0; i < nums.length; i++) {
    const a = nums[i];
    if (used.has(i)) continue;
    for (let j = i + 1; j < nums.length; j++) {
      const b = nums[j];
      const sum = a + b;
      if (sum === target) {
        count++;
        used.add(j);
      }
    }
  }
  console.log(`pairs=${count}\n`);
}
process.stdin.on("data", () => {
  // ignore intermediate chunks, just collect until end event
});
process.stdin.on("end", end);
