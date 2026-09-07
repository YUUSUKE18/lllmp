const target: number = parseInt(process.argv[2], 10);
let pairs = 0;
let seen = new Set<number>();

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "" || Number.isNaN(parseInt(f, 10))) continue;
    const n = parseInt(f, 10);
    if (seen.has(n)) {
      pairs += 1;
    }
    seen.add(n);
  }
  console.log(`pairs=${pairs}`);
});
