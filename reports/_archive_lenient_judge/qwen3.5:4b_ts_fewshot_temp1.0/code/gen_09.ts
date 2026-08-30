const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let setSize = new Set<string>();
  for (const t of s.split(",")) if (t.trim() !== "") setSize.add(t);
  console.log(`count=${setSize.size} sum=${parseInt(...Array.from(setSize.map((e) => e.match(/^[\-]?[0-9]+/)[1] || "n"))).toString()}`);
});
