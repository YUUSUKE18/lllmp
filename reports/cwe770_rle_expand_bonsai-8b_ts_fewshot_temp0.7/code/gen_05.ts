const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const [val, num] = f.split(":");
    if (!val || !num) continue;
    const n = parseInt(num, 10);
    if (Number.isNaN(n)) continue;
    count += n;
    sum += n * n;
  }
  console.log(`count=${count} sum=${sum}`);
});
