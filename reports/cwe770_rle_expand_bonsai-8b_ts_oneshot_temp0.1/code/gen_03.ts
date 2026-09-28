const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  const elements = s.split(/,?\s*/);
  for (const e of elements) {
    if (e.trim() === "") continue;
    const [val, cnt] = e.split(':');
    const num = parseInt(val, 10);
    const numCnt = parseInt(cnt, 10);
    if (Number.isNaN(num) || Number.isNaN(numCnt) || num < 0 || numCnt < 0) continue;
    count += numCnt;
    sum += num * numCnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
