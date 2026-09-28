const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let max: number | null = null;
  for (let i = 0; i < s.length; ) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;
    const startIdx = i;
    let valStr = "";
    while (i < s.length && /[0-9\-]/.test(s[i])) {
      valStr += s[i];
      i++;
    }
    if (!valStr || !/^-?\d+$/.test(valStr)) continue;
    const n = parseInt(valStr, 10);
    if (max === null || n > max) {
      max = n;
    }
  }
  let count = 0;
  for (let i = 0; i < s.length; ) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;
    const startIdx = i;
    let valStr = "";
    while (i < s.length && /[0-9\-]/.test(s[i])) {
      valStr += s[i];
      i++;
    }
    if (!valStr || !/^-?\d+$/.test(valStr)) continue;
    const n = parseInt(valStr, 10);
    count++;
  }
  console.log(`count=${count} max=${max}`);
});
