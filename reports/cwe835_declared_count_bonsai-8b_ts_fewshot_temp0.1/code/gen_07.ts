const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  let inNumber = false;
  for (const ch of s) {
    if (ch === "\n") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = 0;
        inNumber = false;
      }
      continue;
    }
    if (ch === " ") {
      if (inNumber) {
        inNumber = false;
        currentNumber = 0;
      }
      continue;
    }
    if (ch === ",") {
      if (inNumber) {
        inNumber = false;
        currentNumber = 0;
      }
      continue;
    }
    if (ch === "") continue;
    if (/\d/.test(ch)) {
      inNumber = true;
      currentNumber = 0;
    } else {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = 0;
        inNumber = false;
      }
    }
  }
  if (inNumber) {
    const num = parseInt(currentNumber, 10);
    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
