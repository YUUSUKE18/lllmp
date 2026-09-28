const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, total = 0, first = true;
  for (const f of s.split(/,+/)) {
    if (f.trim() === "") continue;
    const [val, num] = f.split(':').map(Number);
    if (Number.isNaN(val) || Number.isNaN(num)) continue;
    count += num;
    total += val * num;
    if (!first) {
      total = total % (0xFFFFFFFFFFFFFFFF);
    }
    first = false;
  }
  console.log(`count=${count} sum=${total}`);
});
