const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    if (f.trim() === "") continue;
    const [val, cnt] = f.split(':');
    const n = parseInt(val, 10);
    const num = parseInt(cnt, 10);
    if (Number.isNaN(n) || Number.isNaN(num) || num < 0) continue;
    for (let i = 0; i < num; i++) {
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
