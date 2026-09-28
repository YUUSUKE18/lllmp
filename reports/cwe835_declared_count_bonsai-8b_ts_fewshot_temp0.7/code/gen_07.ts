const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let current = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\n') {
      if (current !== 0) {
        count++;
        sum += current;
        current = 0;
      }
      continue;
    }
    if (isNaN(s[i])) continue;
    current = s[i] - '0';
    if (current > 0) {
      count++;
      sum += current;
    }
  }
  if (current !== 0) {
    count++;
    sum += current;
  }
  console.log(`count=${count} sum=${sum}`);
});
