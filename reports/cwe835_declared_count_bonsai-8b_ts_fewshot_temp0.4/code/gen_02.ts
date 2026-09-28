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
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === " ") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === ",") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === "\r") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === "\t") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === "\x0b") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === "\x0c") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === "\x0e") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === "\x0f") {
      if (inNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
        }
        currentNumber = "";
        inNumber = false;
      }
      continue;
    }
    
    if (ch === "0" && inNumber) {
      currentNumber = "0";
      inNumber = true;
    } else if (ch === "1" && inNumber) {
      currentNumber = "1";
      inNumber = true;
    } else if (ch === "2" && inNumber) {
      currentNumber = "2";
      inNumber = true;
    } else if (ch === "3" && inNumber) {
      currentNumber = "3";
      inNumber = true;
    } else if (ch === "4" && inNumber) {
      currentNumber = "4";
      inNumber = true;
    } else if (ch === "5" && inNumber) {
      currentNumber = "5";
      inNumber = true;
    } else if (ch === "6" && inNumber) {
      currentNumber = "6";
      inNumber = true;
    } else if (ch === "7" && inNumber) {
      currentNumber = "7";
      inNumber = true;
    } else if (ch === "8" && inNumber) {
      currentNumber = "8";
      inNumber = true;
    } else if (ch === "9" && inNumber) {
      currentNumber = "9";
      inNumber = true;
    } else if (ch === "a" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "b" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "c" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "d" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "e" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "f" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "g" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "h" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "i" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "j" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "k" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "l" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "m" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "n" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "o" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "p" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "q" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "r" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "s" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "t" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "u" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "v" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "w" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "x" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "y" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    } else if (ch === "z" && inNumber) {
      currentNumber += ch;
      inNumber = true;
    }
  }
  
  if (inNumber) {
    const num = parseInt(currentNumber, 10);
    if (!Number.isNaN(num)) {
      count++;
      sum += num;
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
