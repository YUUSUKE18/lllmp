const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,?\s*/);
  let count = 0, max = -9007199254740992;
  for (const el of elements) {
    if (el.trim() === "") continue;
    const n = parseInt(el, 10);
    if (Number.isNaN(n)) continue;
    count++;
    if (n > max) { max = n; }
  }
  console.log(`count=${count} max=${max}`);
});
