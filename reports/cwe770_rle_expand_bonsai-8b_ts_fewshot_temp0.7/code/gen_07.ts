const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const [val, num] = f.split(":");
    const n = parseInt(val, 10);
    const m = parseInt(num, 10);
    if (n === undefined || m === undefined || isNaN(n) || isNaN(m)) continue;
    if (n < 0 || m < 0) continue;
    count += m;
    sum += n * m;
  }
  console.log(`count=${count} sum=${sum}`);
});
