let target: number | null = null;
let numbers: number[] = [];
let count = 0;

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (target === null) {
    // 1行目: 目標値
    target = parseInt(lines[0], 10);
  } else {
    // 2行目以降: 数値
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
    // データが不十分な場合は何も出力しない（または適切なエラー処理）
    // この問題の制約から、データが与えられることを前提とするが、念のため。
    // 実際には、データが与えられなかった場合の振る舞いは仕様に依存するが、ここでは空の出力を選ぶ。
    return;
  }

  // 2個の組の数を数える。
  // 2つの数 a と b が a + b = target を満たす必要がある。
  // numbers の要素が 2 個以上ある場合、
  // 2つの異なるインデックス i と j (i != j) について numbers[i] + numbers[j] = target となる組の数を数える。
  
  // 効率的に数えるために、ハッシュマップ（または配列）を使って出現回数を数える。
  // ただし、問題文は「2個の組（位置が異なる 2 個）の個数」を求めているため、
  // どのインデックスのペアを数えるかを考慮する必要がある。
  
  // ここで、入力された数列から、和が target になるペアの数を数える。
  // 2つの異なる位置 i と j について、numbers[i] + numbers[j] = target を満たすペア (i, j) を数える。
  
  let pairCount = 0;
  const n = numbers.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
