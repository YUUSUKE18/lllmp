const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").split(/\r\n+/);
  let count = 0, sum = 0, first = true;
  for (const line of s) {
    if (line.trim() === "") continue;
    const nums = line.split(/\s+/);
    for (const num of nums) {
      if (num.trim() === "") continue;
      const n = parseInt(num, 10);
      if (Number.isNaN(n)) continue;
      count++;
      sum += n;
      first = false;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
