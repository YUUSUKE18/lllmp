let target: number | undefined = undefined;
let numbers: number[] = [];
let count = 0;
let foundPairs = 0;

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (target === undefined) {
    // 1行目: 目標値の読み込み
    target = parseInt(lines[0], 10);
  } else {
    // 2行目以降: 数値の読み込み
    for (const line of lines) {
      const num = parseInt(line, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }
});

process.stdin.on('end', () => {
  if (target === undefined || numbers.length < 2) {
    // 必要な情報が不足している場合は何も出力しない（仕様上、入力が不足する場合はこの挙動が許容される）
    return;
  }

  // すべてのペアをチェック
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        foundPairs++;
      }
    }
  }

  // 結果の出力
  console.log(`pairs=${foundPairs}`);
});
