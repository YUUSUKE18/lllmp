const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = "";
  for (const ch of s) {
    if (ch === " ") continue;
    if (ch === "\n") {
      if (currentNumber) {
        const n = parseInt(currentNumber, 10);
        if (!Number.isNaN(n)) {
          sum += n;
          count++;
        }
        currentNumber = "";
      }
    } else if (ch === "") continue;
    if (!currentNumber) continue;
    currentNumber += ch;
  }
  if (currentNumber) {
    const n = parseInt(currentNumber, 10);
    if (!Number.isNaN(n)) {
      sum += n;
      count++;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
