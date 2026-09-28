const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/);
  let count = 0, sum = 0;
  for (const item of items) {
    const [key, value] = item.split(":");
    if (!key || !value) continue;
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) continue;
    count += num;
    sum += num * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
