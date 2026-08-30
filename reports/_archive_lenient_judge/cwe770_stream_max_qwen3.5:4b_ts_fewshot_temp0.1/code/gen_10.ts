const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f, 10);
      if (!Number.isNaN(n) && isFinite(n)) {
        count++;
        if (first || n > max) {
          max = n;
          first = false;
        }
      }
    } catch (_) {}
  }

  console.log(`count=${count} max=${max}`);
});
