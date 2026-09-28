const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    if (f.trim() === "") continue;
    const [val, cnt] = f.split(':');
    if (!val || !cnt) continue;
    const num = parseInt(val, 10);
    const numCnt = parseInt(cnt, 10);
    if (Number.isNaN(num) || Number.isNaN(numCnt)) continue;
    if (first || num > max || num * numCnt > sum) {
      max = num;
      sum = num * numCnt;
      first = false;
    }
    count += numCnt;
    sum += num * numCnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
