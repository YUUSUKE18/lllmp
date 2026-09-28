let target: number | undefined = undefined;
let numbers: number[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  const lines = data.trim().split('\n').filter(line => line.length > 0);
  
  if (target === undefined) {
    // 1行目は目標値
    target = parseInt(lines[0], 10);
  } else if (lines.length > 0) {
    // 2行目以降は整数
    for (const line of lines) {
      const num = parseInt(line.trim(), 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }
});

process.stdin.on("end", () => {
  if (target === undefined || numbers.length < 2) {
    // 必要な情報が不足している場合は何も出力しない（仕様上は入力が保証されるべきだが念のため）
    return;
  }

  let count = 0;
  const n = numbers.length;

  // すべてのペアをチェックする (O(N^2))
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
