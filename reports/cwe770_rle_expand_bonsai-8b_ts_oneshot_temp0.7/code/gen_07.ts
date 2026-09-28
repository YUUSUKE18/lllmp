const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    const [val, cnt] = f.split(':');
    if (!val || !cnt) continue;
    const num = parseInt(val, 10);
    const numCnt = parseInt(cnt, 10);
    if (isNaN(num) || isNaN(numCnt) || numCnt < 0) continue;
    if (first || num > max || numCnt > max) { max = num; first = false; }
    count += num;
    sum += num * numCnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
