const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    if (f.trim() === "") continue;
    const [val, freq] = f.split(':');
    if (isNaN(val) || isNaN(freq)) continue;
    const n = parseInt(val, 10);
    const num = parseInt(freq, 10);
    if (n === 0) continue;
    if (first || n > max || (n === max && num > first)) {
      max = n;
      first = false;
      count += num;
      sum += n * num;
    } else if (n === max) {
      count += num;
      sum += n * num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
