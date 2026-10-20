const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(/,+/).map(e => e.trim());
  const unique = new Set(entries.filter(e => e && /^\d+$/.test(e)));
  const count = unique.size;
  const sum = Array.from(unique).reduce((acc, num) => acc + parseInt(num, 10), 0);
  console.log(`count=${count} sum=${sum}`);
});
