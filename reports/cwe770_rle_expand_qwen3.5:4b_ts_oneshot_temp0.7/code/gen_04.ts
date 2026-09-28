const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let i = 0;
  while (i < s.length) {
    if (s[i] === " ") {
      i++;
      continue;
    }
    const match = /^(\d+):(\d+)\s*(?=\s|,\s*$)/.exec(s.slice(i));
    if (!match) break;
    const valStr = match[1];
    const countStr = match[2];
    i += match[0].length;
    const n = parseInt(valStr, 10);
    const m = parseInt(countStr, 10);
    if (isNaN(n) || isNaN(m)) continue;
    count += m;
    sum += n * m;
  }
  console.log(`count=${count} sum=${sum}`);
});
