import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
let count = 0;
let maxVal = -Infinity;
let isReadingNumber = false;
let currentNumberStr = "";

for (const char of input) {
  if (char >= '0' && char <= '9') {
    currentNumberStr += char;
    isReadingNumber = true;
  } else {
    if (isReadingNumber) {
      const num = parseInt(currentNumberStr, 10);
      if (!isNaN(num)) {
        count++;
        if (num > maxVal) {
          maxVal = num;
        }
      }
      currentNumberStr = "";
      isReadingNumber = false;
    }
  }
}

// 最後の数値をチェック
if (isReadingNumber) {
  const num = parseInt(currentNumberStr, 10);
  if (!isNaN(num)) {
    count++;
    if (num > maxVal) {
      maxVal = num;
    }
  }
}

process.stdout.write(`count=${count} max=${maxVal}\n`);
