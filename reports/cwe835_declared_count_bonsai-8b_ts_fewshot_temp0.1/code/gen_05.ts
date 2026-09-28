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
    if (ch === "-") {
      if (inNumber) {
        inNumber = true;
        currentNumber = 0;
      }
      continue;
    }
    if (ch >= "0" && ch <= "9") {
      inNumber = true;
      currentNumber = currentNumber * 10 + (ch.charCodeAt(0) - "0".charCodeAt(0));
    } else {
      if (inNumber) {
        if (!isNaN(currentNumber)) {
          count++;
          sum += currentNumber;
        }
        currentNumber = 0;
        inNumber = false;
      }
    }
  }
  if (inNumber) {
    if (!isNaN(currentNumber)) {
      count++;
      sum += currentNumber;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
