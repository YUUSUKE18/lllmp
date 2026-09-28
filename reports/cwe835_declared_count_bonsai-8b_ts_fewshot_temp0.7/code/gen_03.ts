const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  let isNumber = false;
  for (const ch of s) {
    if (ch === " ") continue;
    if (ch === "\n") {
      if (isNumber) {
        const n = parseInt(currentNumber, 10);
        if (!Number.isNaN(n)) {
          sum += n;
          count++;
        }
        currentNumber = "";
        isNumber = false;
      }
      continue;
    }
    if (ch === "-" || ch >= "0" && ch <= "9") {
      if (!isNumber) {
        isNumber = true;
        currentNumber = ch;
      } else {
        currentNumber += ch;
      }
    } else {
      if (isNumber) {
        const n = parseInt(currentNumber, 10);
        if (!Number.isNaN(n)) {
          sum += n;
          count++;
        }
        currentNumber = "";
        isNumber = false;
      }
    }
  }
  if (isNumber) {
    const n = parseInt(currentNumber, 10);
    if (!Number.isNaN(n)) {
      sum += n;
      count++;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
