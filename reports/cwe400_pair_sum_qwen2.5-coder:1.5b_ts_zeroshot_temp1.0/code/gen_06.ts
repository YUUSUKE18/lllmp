// 1行目から目標値を読み込む
const targetValue = parseInt(process.stdin.read());

// 次の行から数値を読み取る
let pairs = 0;
let currentPairs = 0;
let lastNumber = -1;

for (let i = 1; i <= 100; i++) {
  const number = parseInt(process.stdin.read());
  if (number === targetValue - lastNumber) {
    currentPairs++;
  } else if (currentPairs > 0) {
    pairs += currentPairs;
    currentPairs = 0;
  }
  lastNumber = number;
}

// 最後の pair 未処理の追加
if (currentPairs > 0) {
  pairs += currentPairs;
}

// 結果を出力
console.log(`pairs=${pairs}`);
