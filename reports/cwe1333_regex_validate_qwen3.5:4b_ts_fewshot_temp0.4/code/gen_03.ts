const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    const parts = trimmed.split(",");
    if (parts.length < 1) continue;
    let ok = true;
    for (const p of parts) {
      if (!Number.isInteger(Number(p))) {
        ok = false;
        break;
      }
    }
    if (ok) valid++;
  }
  console.log(`valid=${valid}`);
});
