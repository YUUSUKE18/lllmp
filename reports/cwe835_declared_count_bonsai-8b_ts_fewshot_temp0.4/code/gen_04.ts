const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  let inNumber = false;

  for (const ch of s) {
    if (ch === "\n" && inNumber) {
      if (currentNumber !== 0) {
        sum += currentNumber;
        count++;
        currentNumber = 0;
        inNumber = false;
      }
      continue;
    }
    if (ch === "\r" && inNumber) {
      if (currentNumber !== 0) {
        sum += currentNumber;
        count++;
        currentNumber = 0;
        inNumber = false;
      }
      continue;
    }
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      if (inNumber) {
        if (currentNumber !== 0) {
          sum += currentNumber;
          count++;
          currentNumber = 0;
        }
        inNumber = false;
      }
      continue;
    }
    if (/[0-9]/.test(ch)) {
      currentNumber = currentNumber * 10 + parseInt(ch, 10);
      inNumber = true;
    } else if (inNumber) {
      inNumber = false;
    }
  }

  if (inNumber && currentNumber !== 0) {
    sum += currentNumber;
    count++;
  }

  console.log(`count=${count} sum=${sum}`);
});
