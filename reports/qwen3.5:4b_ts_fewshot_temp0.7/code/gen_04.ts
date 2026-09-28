const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const set = new Set<string>();
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    const n = parseInt(w, 10);
    if (Number.isNaN(n)) continue;
    const str = String(n);
    if (set.has(str)) continue;
    set.add(str);
    count++;
    sum += BigInt(n);
  }
  console.log(`count=${count} sum=${sum}`);
});
