const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max = 0;
  for (const w of s.split(",")) {
    const n = parseInt(w, 10);
    if (Number.isNaN(n)) continue;
    if (n > max) max = n;
    if (w.trim() !== "") count++;
  }
  console.log(`count=${count} max=${max}`);
});
