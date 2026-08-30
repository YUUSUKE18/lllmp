const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let countMap = new Map<number, number>();
  let sumMap = new Map<number, number>();

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;

    countMap.set(n, (countMap.get(n) || 0) + 1);
    sumMap.set(n, (sumMap.get(n) || 0) + n);
  }

  let result = "";
  for (const [num] of countMap.entries()) {
    const c = countMap.get(num)!;
    const s = sumMap.get(num)!;
    result += `count=${c} sum=${s}\n`;
  }
  console.log(result);
});
