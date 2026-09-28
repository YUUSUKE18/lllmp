const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let prev = "";
  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    const [val, cnt] = token.split(":").map(Number);
    if (isNaN(val) || isNaN(cnt)) continue;
    if (prev === "") count++;
    else if (val !== prev) {
      count += cnt;
      sum += val * cnt;
      prev = val;
    } else {
      count += cnt;
      sum += val * cnt;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
