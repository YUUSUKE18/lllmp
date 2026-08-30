const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines = 0;
let validLines = 0;

rl.on('line', (line) => {
  lines++;
  // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
  // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
  
  // 行全体をトリムして、カンマで分割する
  const trimmedLine = line.trim();
  
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 末尾のカンマを削除して処理を単純化する
  let processedLine = trimmedLine;
  if (processedLine.endsWith(',')) {
    processedLine = processedLine.slice(0, -1);
  }
  
  // カンマで分割して、空でない要素が存在するか確認する
  const parts = processedLine.split(',');
  
  // 妥当な行は、分割された要素の中に少なくとも1つ以上の数字列が含まれている必要がある。
  // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいること」なので、
  // 空でない要素が1つ以上あれば妥当とみなす。
  
  let hasNumber = false;
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.length > 0 && !isNaN(parseInt(trimmedPart, 10))) {
      hasNumber = true;
      break;
    }
  }

  if (hasNumber) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
