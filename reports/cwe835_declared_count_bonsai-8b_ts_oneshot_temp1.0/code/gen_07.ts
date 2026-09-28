const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let i = 0;
  while (i < s.length) {
    const numStr = s.substring(i);
    if (/^-?\d+$/.test(numStr)) {
      const n = parseInt(numStr, 10);
      count++;
      sum += n;
      i += numStr.length;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
