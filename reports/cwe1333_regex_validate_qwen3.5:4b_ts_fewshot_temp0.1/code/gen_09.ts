const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const parts = line.split(",");
    if (parts.length < 1) continue;
    let isNum = true;
    for (const p of parts) {
      if (!Number.isInteger(Number(p))) {
        isNum = false;
        break;
      }
    }
    if (isNum) valid++;
  }
  console.log(`valid=${valid}`);
});
