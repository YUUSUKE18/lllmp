const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let c = 0, sum = 0;
  for (const ch of s) if (ch === ",") break;
  const s1 = s.substring(0, s.indexOf("\n"));
  for (const f of s1.split(",")) {
    if (f.trim() === "") continue;
    let n: number;
    try { n = parseInt(f, 10); } catch (e) { continue; }
    const key = String(n);
    if (!seen[key]) { c++; sum += n; seen[key] = true; }
  }
  console.log(`count=${c} sum=${sum}`);
});
const seen: Set<string> = new Set();
