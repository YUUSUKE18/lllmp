const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let value = 0, num = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ':') {
      if (num > 0) {
        count += num;
        sum += num * num;
        num = 0;
      }
      if (i + 1 < s.length && s[i + 1] === ',') {
        num = parseInt(s.substring(i + 2, i + 3), 10);
        value = num;
      } else {
        num = parseInt(s.substring(i + 2, s.length), 10);
        value = num;
      }
    } else if (s[i] === ',') {
      if (num > 0) {
        count += num;
        sum += num * num;
        num = 0;
      }
    } else {
      num = num * 10 + parseInt(s[i], 10);
    }
  }
  if (num > 0) {
    count += num;
    sum += num * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
