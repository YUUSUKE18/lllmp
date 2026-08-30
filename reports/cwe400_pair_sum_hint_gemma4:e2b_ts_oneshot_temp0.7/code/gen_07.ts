let target: number | null = null;
let numbers: number[] = [];

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  if (target === null) {
    // 1行目が目標値
    target = parseInt(lines[0], 10);
  } else if (lines.length > 0) {
    // 2行目以降が整数
    for (const line of lines) {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }
});

process.stdin.on("end", () => {
  if (target === null || numbers.length < 2) {
    // 不足している場合は何も出力しない（仕様上、入力が不完全な場合は処理しない）
    return;
  }

  let pairCount = 0;
  const n = numbers.length;

  // 2つの組 (numbers[i] + numbers[j] = target, i != j) の個数を数える
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
