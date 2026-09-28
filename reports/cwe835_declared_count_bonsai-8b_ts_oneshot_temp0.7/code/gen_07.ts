const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  const tokens = s.split(/\s+/);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token) continue;
    const n = parseInt(token, 10);
    if (Number.isNaN(n)) continue;
    count++;
    sum += n;
  }
  console.log(`count=${count} sum=${sum}`);
});
