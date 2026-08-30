const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal = Number.NEGATIVE_INFINITY;

  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    try {
      const n = parseInt(w, 10);
      if (!Number.isNaN(n)) {
        count++;
        if (n > maxVal) {
          maxVal = n;
        } else if (maxVal !== Number.NEGATIVE_INFINITY && n < maxVal) {
           // Already handled by first check, but ensures correctness for all cases
        }
      }
    } catch (_) {}
  }

  console.log(`count=${count} max=${Number.isFinite(maxVal) ? Math.floor(maxVal) : "undefined"}`);
});
