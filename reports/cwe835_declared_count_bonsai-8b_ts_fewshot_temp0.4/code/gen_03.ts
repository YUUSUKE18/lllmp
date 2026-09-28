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
        currentNumber = "";
        inNumber = false;
      }
    } else if (ch === ",") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
    } else if (ch === " ") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
    } else {
      if (ch === "0" || ch === "1" || ch === "2" || ch === "3" || ch === "4" || ch === "5" || ch === "6" || ch === "7" || ch === "8" || ch === "9") {
        currentNumber += ch;
        inNumber = true;
      } else {
        if (inNumber) {
          const num = parseInt(currentNumber, 10);
          if (!isNaN(num)) {
            count++;
            sum += num;
          }
          currentNumber = "";
          inNumber = false;
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
