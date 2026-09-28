const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const f of s.split(/,+/)) {
    const [val, cnt] = f.split(':');
    if (val.trim() === "" || cnt.trim() === "") continue;
    const n = parseInt(val, 10);
    if (Number.isNaN(n)) continue;
    const num = parseInt(cnt, 10);
    if (num < 0) continue;
    count += num;
    sum += n * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
