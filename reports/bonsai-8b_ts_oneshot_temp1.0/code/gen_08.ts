const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/).map(i => i.trim());
  const unique = [...new Set(items)].filter(i => !isNaN(i) && i !== "");
  const count = unique.length;
  const sum = unique.reduce((a, b) => a + b, 0);
  console.log(`count=${count} sum=${sum}`);
});
