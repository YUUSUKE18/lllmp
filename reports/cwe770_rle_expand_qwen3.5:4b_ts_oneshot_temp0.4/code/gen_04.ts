const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  let i = 0;
  while (i < s.length) {
    if (s[i] === " " || s[i] === "\t") {
      i++;
      continue;
    }
    const start = i;
    while (i < s.length && s[i] !== ":") i++;
    if (i > start) {
      const valStr = s.slice(start, i).trim();
      if (!valStr.match(/^-?\d+$/)) continue;
      const val = BigInt(parseInt(valStr, 10));
      while (i < s.length && s[i] !== ",") i++;
      let repStr = "";
      if (i < s.length) {
        repStr = s.slice(i + 1).trim();
        if (!repStr.match(/^-?\d+$/)) continue;
        const rep = parseInt(repStr, 10);
        if (rep < 0) continue;
        count += val * BigInt(rep);
        sum += val * BigInt(rep);
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
