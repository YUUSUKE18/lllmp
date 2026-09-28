const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const item of s.split(",")) {
    const [key, val] = item.split(":");
    if (key.trim() === "" || val.trim() === "") continue;
    const num = parseInt(val, 10);
    if (Number.isNaN(num)) continue;
    count += num;
    sum += num * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
