const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/);
  let count = 0, sum = 0;
  for (const e of elements) {
    const [val, cnt] = e.split(':');
    if (!val || !cnt) continue;
    const num = parseInt(val, 10);
    if (isNaN(num)) continue;
    const numCnt = parseInt(cnt, 10);
    if (numCnt < 0) continue;
    count += numCnt;
    sum += numCnt * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
