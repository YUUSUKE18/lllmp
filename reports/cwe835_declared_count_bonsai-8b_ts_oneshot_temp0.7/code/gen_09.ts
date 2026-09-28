const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (let i = 0; i < s.length; i += 3) {
    const line = s.substring(i, i + 3);
    if (!/^\d+$/.test(line)) continue;
    count++;
    const num = parseInt(line, 10);
    if (Number.isNaN(num)) continue;
    sum += num;
    first = false;
  }
  if (count === 0) {
    console.log("count=0 sum=0");
  } else {
    console.log(`count=${count} sum=${sum}`);
  }
});
