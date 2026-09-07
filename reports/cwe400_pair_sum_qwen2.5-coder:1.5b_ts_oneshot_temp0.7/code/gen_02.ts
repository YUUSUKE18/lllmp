const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split(/\s+/)[0], 10);
  let count = 0;

  let prev = null;
  for (const n of s.split(/\s+/).slice(1)) {
    if (n.trim() === "") continue;
    const current = parseInt(n, 10);
    if (Number.isNaN(current)) continue;

    if (prev !== null && current + prev === target) {
      count++;
    }
    prev = current;
  }

  console.log(`pairs=${count}`);
});
