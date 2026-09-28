const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  const counts = new Map<number, number>();

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f.trim(), 10);
      if (!Number.isNaN(n) && Number.isFinite(n)) {
        counts.set(n, (counts.get(n) || 0) + 1);
        sum += BigInt(n);
      }
    } catch (_) {}
  }

  let output = "";
  for (const [n, c] of counts.entries()) {
    if (output !== "") output += " ";
    output += `${c}=${n}`;
  }

  console.log(output + "\n");
});
