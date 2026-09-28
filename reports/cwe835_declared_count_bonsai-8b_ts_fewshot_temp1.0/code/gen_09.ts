const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let current = 0;
  for (let i = 0; i < s.length; i++) {
    if (/\d/.test(s[i])) {
      current = current * 10 + parseInt(s[i], 10);
      if (i === s.length - 1 || !/\d/.test(s[i + 1])) {
        count++;
        sum += current;
        current = 0;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
