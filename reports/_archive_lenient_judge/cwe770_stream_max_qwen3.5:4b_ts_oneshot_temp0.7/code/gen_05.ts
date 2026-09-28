const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString();
  let count = 0;
  let maxVal = Number.NEGATIVE_INFINITY;

  for (const chunk of s.split(",")) {
    if (/^-?[\d]+/.test(chunk.trim())) {
      const n = parseInt(chunk, 10);
      if (!Number.isNaN(n) && isFinite(n)) {
        count++;
        if (count === 1 || n > maxVal) {
          maxVal = n;
        }
      }
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
