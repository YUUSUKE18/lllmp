const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const f of s.split(/,+/)) {
    const [val, cnt] = f.split(':');
    if (val.trim() === "" || cnt.trim() === "") continue;
    const num = parseInt(val, 10);
    const numCnt = parseInt(cnt, 10);
    if (Number.isNaN(num) || Number.isNaN(numCnt)) continue;
    count += numCnt;
    sum += num * numCnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
