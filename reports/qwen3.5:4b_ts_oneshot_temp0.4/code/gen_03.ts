const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const tokens = s.split(/\s*,\s*/);
  const counts = new Map<number, number>();
  let sum = 0n;
  
  for (const token of tokens) {
    if (token.trim() === "") continue;
    const n = parseInt(token, 10);
    if (Number.isNaN(n)) continue;
    
    const currentSum = BigInt(sum);
    const count = counts.get(n) ?? 0n;
    sum += n;
    counts.set(n, count + 1n);
  }
  
  let output = "";
  for (const [num, cnt] of counts.entries()) {
    if (output !== "") output += " ";
    output += `${cnt} ${sum}`;
  }
  
  console.log(output.trim());
});
