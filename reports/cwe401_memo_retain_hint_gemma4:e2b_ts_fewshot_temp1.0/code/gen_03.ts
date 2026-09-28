const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSum = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  let n: number;
  try {
    n = parseInt(line.trim(), 10);
    if (isNaN(n)) return;
  } catch (e) {
    return;
  }

  // メモ化された結果があればそれを使用
  if (memo.has(n)) {
    totalSum += memo.get(n);
    return;
  }

  // 再帰/動的計画法で計算
  if (n === 1) {
    memo.set(1, 0);
  } else if (n % 2 === 0) {
    // nが偶数なら n/2
    const result = calculate(n / 2);
    memo.set(n, 1 + result);
  } else {
    // nが奇数なら 3n+1
    const result = calculate(3 * n + 1);
    memo.set(n, 1 + result);
  }
  
  // 再帰呼び出しの代わりに、Memoizationを使った直接的な計算ロジックを再構築する必要がある。
  // ここでは、標準的なCollatz問題の手数計算をメモ化で実現する。
  
  // 計算結果を直接求める関数を定義し直す
});

// Collatz数列の手数計算とメモ化
function calculate(n: number): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let current = n;
    const path: number[] = [];
    
    while (current !== 1) {
        path.push(current);
        if (current % 2 === 0) {
            current /= 2;
        } else {
            current = 3 * current + 1;
        }
    }

    // 経路を遡って計算結果を求める
    let steps = path.length;
    let temp = n;
    let stepIndex = path.length - 1;

    // 計算結果をメモ化する
    // この実装は、入力されたnから1に到達するまでのステップ数を求める。
    // 経路を記録し、到達したときのステップ数を集計する。
    
    // 単純な再帰/メモ化で考えると、現在のnから1へのパスの長さが求められる。
    
    // 再度、標準的なメモ化されたCollatz計算を適用する。
    let count = 0;
    let currentN = n;
    const visited = new Set<number>();
    
    while (currentN !== 1) {
        if (visited.has(currentN)) {
            // サイクルに陥った場合、これは問題の定義（1に到達する手数）に合わないが、
            // 実際にはCollatz問題では1に収束することが保証されているため、ここではスキップ。
            // ただし、Memoizationが正しく機能していることを期待する。
            break;
        }
        visited.add(currentN);
        
        if (currentN % 2 === 0) {
            currentN /= 2;
        } else {
            currentN = 3 * currentN + 1;
        }
        count++;
    }
    
    // サイクル検出を考慮しても、計算過程で呼び出された関数自体がメモ化を更新する。
    
    // 最終的な結果をMemoize
    memo.set(n, count);
    return count;
}


// 入力の処理を再構成して、1行ずつ読み込み、その都度計算する形にする
// 課題の要求：「すべてのクエリの手数の合計を求めます。」

// 再度、標準入力を読み込む（行ごとに処理）
const inputData: string[] = [];
rl.on('line', (line) => {
    if (line.trim() === "") return;
    inputData.push(line.trim());
});

rl.on('end', () => {
    let finalTotal = 0;
    for (const line of inputData) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n)) continue;
        } catch (e) {
            continue;
        }

        if (n === 1) {
            // n=1の手数は0
            finalTotal += 0;
        } else {
            // calculate関数がメモ化と計算を実行する
            const result = calculate(n);
            finalTotal += result;
        }
    }

    console.log(`total=${finalTotal}`);
});

// 実行時に、calculate関数が正しく動作するように、読み込みと計算のフローを調整する。
// 外部から与えられる入力は、1行に1つの整数である。

// 最終的なコードとして、標準入力から全ての整数を読み込み、計算する形を採用する。
// 読み込みが一度に全て揃うのを待つ必要がある。
