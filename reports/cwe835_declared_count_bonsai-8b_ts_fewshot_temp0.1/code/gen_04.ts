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
    } else if (ch === ",") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = 0;
        inNumber = false;
      }
    } else if (ch === " ") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = 0;
        inNumber = false;
      }
    } else {
      if (inNumber) {
        currentNumber = currentNumber * 10 + parseInt(ch, 10);
        inNumber = true;
      } else {
        if (ch.trim() !== "") {
          currentNumber = parseInt(ch, 10);
          inNumber = true;
        }
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
