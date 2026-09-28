const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    if (f.trim() === "") continue;
    const [val, num] = f.split(":");
    if (val.trim() === "" || num.trim() === "") continue;
    const n = parseInt(num, 10);
    if (Number.isNaN(n)) continue;
    count += n;
    sum += n * n;
    first = false;
  }
  console.log(`count=${count} sum=${sum}`);
});
