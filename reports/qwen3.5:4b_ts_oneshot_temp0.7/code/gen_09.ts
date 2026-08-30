const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let sum = BigInt(0);
  const counts = new Map<string, number>();

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    const key = String(n);
    const count = counts.get(key) ?? 0;
    counts.set(key, count + 1);
    sum += BigInt(n);
  }

  let resultStr = "";
  for (const [key, count] of counts.entries()) {
    if (resultStr !== "") resultStr += " ";
    resultStr += `${count}=${key}`;
  }

  console.log(resultStr);
});
