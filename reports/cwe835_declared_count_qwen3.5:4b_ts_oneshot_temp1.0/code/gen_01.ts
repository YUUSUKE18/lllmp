const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = [...s.split(/\r?\n/)].map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) {
    console.log("count=0 sum=0");
    return;
  }
  const countInput = parseInt(lines[0], 10);
  if (Number.isNaN(countInput)) {
    console.log("count=0 sum=0");
    return;
  }
  const count = Math.min(countInput, lines.length - 1);
  let sum = BigInt(0);
  for (let i = 0; i < count; i++) {
    const valStr = lines[i + 1];
    const n = parseInt(valStr, 10);
    if (Number.isNaN(n)) continue;
    sum += BigInt(n);
  }
  console.log(`count=${count} sum=${sum.toString()}`);
});
