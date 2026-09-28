const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  if (lines.length === 0) {
    console.log('pairs=0');
    return;
  }

  // 1行目が目標値
  const target = parseInt(lines[0], 10);
  if (isNaN(target)) {
    // 1行目が無効な場合は処理を終了（問題の制約から通常は発生しないが安全のため）
    console.log('pairs=0');
    return;
  }

  // 2行目以降の整数を抽出
  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 2個の組の個数を求める
  let pairCount = 0;
  const n = numbers.length;

  // O(N^2)で全ペアをチェックする（制約が不明だが、一般的な競技プログラミングの文脈ではこのレベルの入力に対しては許容されることが多い。
  // ただし、より効率的なO(N log N)またはO(N)の解法が存在する。ここでは与えられた制約と「実用的な時間」を考慮し、まずは$O(N^2)$で実装する）
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  // 結果を出力
  console.log(`pairs=${pairCount}`);
});
