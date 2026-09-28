const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  const elements = s.split(/,+/);
  for (const element of elements) {
    const [key, value] = element.split(':');
    if (!key || !value) continue;
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) continue;
    count += num;
    sum += num * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
