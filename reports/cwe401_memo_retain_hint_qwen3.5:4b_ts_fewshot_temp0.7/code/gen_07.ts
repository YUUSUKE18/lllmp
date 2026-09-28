const memo = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => process.stdin.emit("drain"));
process.stdin.on("end", () => {
  const s = Buffer.concat(process.stdin._readableState.buffer).toString("utf8");
  let total = 0;
  for (const line of s.split("\n")) {
    if (!line.trim()) continue;
    const val = parseInt(line, 10);
    if (isNaN(val) || val <= 0) continue;
    let steps = 0;
    while (val !== 1) {
      if (val in memo) {
        steps += memo.get(val);
        break;
      }
      const isEven = val % 2 === 0;
      const nextVal = isEven ? val / 2 : 3 * val + 1;
      if (!memo.has(nextVal)) memo.set(nextVal, 0);
      steps++;
      val = nextVal;
    }
    total += (val === 1 ? 0 : steps - (val in memo ? memo.get(val) : 0));
  }
  console.log(`total=${total}`);
});
