const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const part of s.split(",")) {
    const [val, num] = part.split(":");
    if (!val || !num) continue;
    const num = parseInt(num, 10);
    if (Number.isNaN(num) || num < 0) continue;
    count += num;
    sum += num * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
