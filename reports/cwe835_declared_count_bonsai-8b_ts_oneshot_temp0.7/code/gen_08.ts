const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, max = 0, first = true;
  const nums = s.split(/\d+/).filter(n => n.length > 0);
  for (const f of nums) {
    if (first || parseInt(f, 10) > max) { max = parseInt(f, 10); first = false; }
    count++;
    sum += parseInt(f, 10);
  }
  console.log(`count=${count} sum=${sum}`);
});
