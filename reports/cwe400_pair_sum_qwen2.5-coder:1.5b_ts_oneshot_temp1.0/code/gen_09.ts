const targetValue = parseInt(readline()); // 1 行目で目标値を取得
let pairCount = 0; // 足して目標値になる 2 個の組数をカウントする

// 2 行目以降の整数を処理
let i = 0;
while (i < 20) { // 20 個までを処理（上限が30行のとき）
  const line = readline();
  const numbers = line.split(/\s+/); // 空白区切りで整数列を取得

  // 空行または整数として解釈できない行を無視
  if (line.trim() === '' || numbers.some(n => isNaN(parseInt(n, 10)))) continue;

  // 2 個の数を足す
  let sum = 0;
  for (const num of numbers) {
    sum += parseInt(num, 10);
  }

  // 目標値を足す
  sum += targetValue;

  // 2 個の数が足すのを目標値になるかチェック
  if (sum === targetValue) {
    pairCount++; // 2 個の組数をカウント
  }

  i++; // 次の行を処理
}

// 最終的な結果を出力
console.log(`pairs=${pairCount}`);
