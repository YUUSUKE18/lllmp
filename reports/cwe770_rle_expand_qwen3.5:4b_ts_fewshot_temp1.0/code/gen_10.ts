const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let c = 0, sum = 0;
  let pos = 0;
  while (pos < s.length) {
    if (!/^\d+:/.test(s.slice(pos))) break;
    const colonIdx = s.indexOf(":", pos);
    if (colonIdx === -1) break;
    const numStr = s.slice(pos, colonIdx).trim();
    const countStr = s.slice(colonIdx + 1).trim().split(",")[0].trim();
    let val = parseInt(numStr, 10);
    let cnt = parseInt(countStr, 10);
    if (isNaN(val) || isNaN(cnt)) {
      pos = colonIdx + 1;
      continue;
    }
    c += cnt;
    sum += val * cnt;
    pos = s.indexOf(",") === -1 ? s.length : s.lastIndexOf(",") + 1;
    if (pos !== s.length && !s.startsWith(/^\d+/, pos)) break;
  }
  console.log(`count=${c} sum=${sum}`);
});
