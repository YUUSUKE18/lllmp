const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,?\s*/);
  let count = 0, sum = 0;
  for (const e of elements) {
    if (e.trim() === "") continue;
    const [val, cnt] = e.split(":");
    if (!val || !cnt) continue;
    const num = parseInt(val, 10);
    if (Number.isNaN(num)) continue;
    const numCnt = parseInt(cnt, 10);
    if (numCnt < 0) continue;
    count += numCnt;
    sum += numCnt * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
