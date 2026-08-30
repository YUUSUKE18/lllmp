import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let input = '';

rl.on('line', (line) => {
  input += line + '\n';
});

rl.on('close', () => {
  if (!input.trim()) {
    process.stdout.write('count=0 max=0\n');
    return;
  }

  const parts = input.trim().split(',');
  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === '') continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      // 数値として有効な要素のみをカウントし、最大値を計算する
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 空要素や非整数要素を無視した上で、読み取れた整数と最大値を報告する。
  // 問題の意図として「カンマ区切りの整数列」が与えられた場合、
  // その列に含まれる有効な整数の数と最大値を求めることを想定する。
  // ただし、例題の形式に合わせるため、読み取ったカンマ区切りの要素数を基にするか、
  // または実際に解析できた整数のみを基にするかの解釈が必要。
  // 仕様: 「『要素数』と『最大値』を求めます。」 -> 読み取った入力に含まれる有効な整数の数と最大値を求める。

  // ここでは、入力文字列に含まれるカンマ区切りで分割された後の「整数として解釈できた要素の数」と「その中の最大値」を求めるのが最も自然。
  process.stdout.write(`count=${validCount} max=${maxValue}\n`);
});
