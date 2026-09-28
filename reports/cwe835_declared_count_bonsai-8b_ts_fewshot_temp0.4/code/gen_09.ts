const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = "";
  for (const ch of s) {
    if (ch === "\n") {
      if (currentNumber) {
        const n = parseInt(currentNumber, 10);
        if (!isNaN(n)) {
          count++;
          sum += n;
          currentNumber = "";
        }
      }
    } else if (ch === ",") {
      if (currentNumber) {
        const n = parseInt(currentNumber, 10);
        if (!isNaN(n)) {
          count++;
          sum += n;
          currentNumber = "";
        }
      }
    } else {
      currentNumber += ch;
    }
  }
  if (currentNumber) {
    const n = parseInt(currentNumber, 10);
    if (!isNaN(n)) {
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
