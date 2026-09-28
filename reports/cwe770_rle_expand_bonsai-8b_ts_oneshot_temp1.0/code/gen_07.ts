const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const item of s.split(",")) {
    const [value, countStr] = item.split(":");
    const n = parseInt(value, 10);
    const num = parseInt(countStr, 10);
    if (n === 0 || num === 0) continue;
    if (first || n > max) { max = n; first = false; }
    count += num;
    sum += n * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
