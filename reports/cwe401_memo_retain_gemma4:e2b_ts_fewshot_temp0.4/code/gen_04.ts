const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_number = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    // このクエリ自体は合計に加算しない（問題文の解釈：各クエリの結果を合計する）
    // 問題文：「すべてのクエリの手数の合計を求めます。」
    // n=1 の場合の手数は 0。
    // ただし、この問題は通常、与えられた数列の各要素に対して操作を繰り返す問題であり、
    // 1 に到達するまでのステップ数を求める問題です。
    // n=1 の場合は 0 ステップ。
    // 設問の意図を「与えられた各数 n について、1 に到達するまでの操作回数を求める」と解釈します。
    // n=1 の場合、すでに 1 なので 0 回。
    
    // ここでは、n が与えられたときの操作回数を計算するロジックを実装します。
    // n=1 の場合は 0。
    // このロジックは、入力が連続するクエリとして扱われることを前提とします。
    // ただし、標準入力の形式が「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」という記述なので、
    // 各行が独立したクエリと見なします。
    
    // 1 に到達するまでの手数を計算する関数を定義し、それを適用します。
    const steps = calculateSteps(n);
    
    // メモ化
    memo.set(n, steps);
    
    // 合計に加算
    total_count += steps;
  } else {
    // n > 1 の場合
    const steps = calculateSteps(n);
    
    // メモ化
    memo.set(n, steps);
    
    // 合計に加算
    total_count += steps;
  }
  
  line_number++;
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});

/**
 * n が 1 に到達するまでの手数を計算する（コナーの数列の逆操作）
 * n が偶数なら n/2、奇数なら 3n+1 を繰り返す。
 * 
 * この問題は、コナーの数列 (3n+1問題) の逆操作を考える必要があります。
 * 逆操作:
 * 1. n が 2k なら、元の数は 2k または (2k - 1)/3 (もし元の数が奇数なら)
 * 2. n が 3k+1 なら、元の数は (n - 1) / 3
 * 
 * しかし、問題文は「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
 * これは、n からスタートして、その操作を繰り返して 1 に到達するまでのステップ数を求めることを意味します。
 * 
 * 操作:
 * n -> n/2 (nが偶数)
 * n -> 3n+1 (nが奇数)
 * 
 * この操作を繰り返すことで 1 に到達するまでのステップ数を求めるため、
 * n から 1 への逆操作を考えるのが最も効率的です。
 * 
 * 逆操作 (x):
 * 1. x = 1 の場合、元の数は 1 (ステップ 0)
 * 2. x が 1 の倍数 (x = 2k) の場合、元の数は 2x (操作は n/2 の逆)
 * 3. x が 1 を引いた 3 の倍数 (x = 3k+1) の場合、元の数は (x - 1) / 3 (操作は 3n+1 の逆)
 * 
 * 1 に到達するまでの手数を求めるには、n から 1 への逆操作を繰り返します。
 */
function calculateSteps(n: number): number {
    if (n === 1) {
        return 0;
    }

    let steps = 0;
    let current = n;

    while (current !== 1) {
        if (current % 2 === 0) {
            // n が偶数なら、操作は n/2 だったので、逆操作は 2n
            // ただし、これは操作の逆を考えるのではなく、n から 1 へのパスを求めるため、
            // n が現在の値で、次のステップで 1 に近づくように操作を適用します。
            // 問題文の操作をそのまま適用します。
            current = current / 2;
            steps++;
        } else {
            // n が奇数なら、操作は 3n+1 だったので、逆操作は (n-1)/3
            // しかし、これは「n から 1 へのパス」を求めるため、
            // n が奇数のとき、n -> 3n+1 ではなく、n -> (n-1)/3 のような操作を考える必要があります。
            // ここでは、与えられた操作をそのまま適用し、1 に到達するまでの回数を数えます。
            current = 3 * current + 1;
            steps++;
        }
        
        // 1 に到達する前に無限ループに陥る可能性があるため、安全策として上限を設定するか、
        // 既にメモ化されている値があればそれを利用する。
        if (steps > 100000) { // 安全のための制限
            // メモ化された値があればそれを使う（これは逆操作で考える場合のみ有効）
            if (memo.has(n)) return memo.get(n);
            // 無限ループを避けるため、ここでは計算を打ち切るか、エラーとする。
            // 問題の制約から、到達可能であると仮定する。
            break;
        }
    }
    
    // 厳密には、この問題はコナーの数列の逆操作を考えることで、
    // n から 1 へのパスの長さを求めるのが標準的です。
    // しかし、指示通りに「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し」を適用します。
    // この操作が「1 に到達するまでの手数」を意味する場合、
    // 逆操作で考えるべきです。
    
    // 逆操作で再計算します（これがコナーの数列のステップ数計算の標準的な方法です）。
    let count = 0;
    let current_val = n;
    while (current_val > 1) {
        if (current_val % 2 === 0) {
            // 逆操作: n/2 の逆は 2n
            // しかし、操作が n -> n/2 なので、逆操作は 2n ではない。
            // 逆操作は、現在の値がどのように生成されたかを逆算する。
            // n = 2k なら k = n/2 (操作の逆)
            current_val = current_val / 2;
        } else {
            // n = 3k+1 なら k = (n-1)/3 (操作の逆)
            current_val = (current_val - 1) / 3;
        }
        count++;
    }
    
    return count;
}

// 標準入力全体を読み込むため、readlineの代わりにストリーム処理を再構成します。
// 上記のreadlineの構造は、入力が1行ずつ与えられることを想定していますが、
// 「1 以上の整数が 1 行に 1 個ずつ並びます」という記述から、入力はスペース区切りで与えられると解釈し、
// 標準入力全体を一度に読み込んで処理する方が、例の形式に近くなります。

// 再度、標準入力全体を読み込み、スペース区切りで処理するように修正します。
// (readlineを使用せず、Buffer全体を処理する形式に戻します)

const fs = require('fs');

try {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log(`total=0`);
        process.exit(0);
    }

    const lines = input.split(/\s+/).filter(s => s.length > 0).map(Number);
    
    let final_total = 0;
    const final_memo = new Map<number, number>();

    for (const n of lines) {
        if (Number.isNaN(n)) continue;

        if (n === 1) {
            final_total += 0;
            final_memo.set(1, 0);
        } else {
            let steps = 0;
            let current = n;
            
            // 1 に到達するまでの手数を求める（逆操作で計算）
            while (current > 1) {
                if (current % 2 === 0) {
                    // 逆操作: n/2 の逆は 2n ではない。
                    // 操作: n -> n/2 (nが偶数)
                    // 逆操作: 2k -> k (k = n/2)
                    current = current / 2;
                } else {
                    // 操作: n -> 3n+1 (nが奇数)
                    // 逆操作: 3k+1 -> k (k = (n-1)/3)
                    current = (current - 1) / 3;
                }
                steps++;
            }
            
            final_total += steps;
            final_memo.set(n, steps);
        }
    }

    console.log(`total=${final_total}`);

} catch (e) {
    // 標準入力がない場合やエラーの場合
    // console.error(e);
    // 実行環境によっては、このブロックは無視されるべき
}
