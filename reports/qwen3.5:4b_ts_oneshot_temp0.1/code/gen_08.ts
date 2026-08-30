const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const counts = new Map<number, number>();
  let sum = 0n;

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    const count = counts.get(n) ?? 0n;
    counts.set(n, count + 1n);
    sum += BigInt(n);
  }

  let output = "";
  for (const [num, cnt] of counts.entries()) {
    if (output !== "") output += " ";
    output += `${cnt} ${num}`;
  }
  
  console.log(output);
});
