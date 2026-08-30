const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let sum = BigInt(0);
  let hasValue = false;

  for (const p of parts) {
    if (p.trim() === "") continue;
    const n = Number(p.trim());
    if (!Number.isNaN(n)) {
      hasValue = true;
      sum += BigInt(n);
    }
  }

  if (!hasValue) {
    console.log(`count=0 sum=0`);
  } else {
    const unique = Array.from(new Set(parts.map(p => p.trim()).filter(p => !Number.isNaN(Number(p)))));
    console.log(`count=${unique.length} sum=${sum}`);
  }
});
