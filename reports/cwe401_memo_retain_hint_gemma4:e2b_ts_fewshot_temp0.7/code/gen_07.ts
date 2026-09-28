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
  if (isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    total_count += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_count += memo.get(n);
    return;
  }

  // 再帰的計算とメモ化
  let steps = 0;
  let current = n;

  while (current !== 1) {
    if (memo.has(current)) {
      // 既に計算済みの値があれば、その結果を足し合わせる
      steps += memo.get(current);
      break;
    }
    
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  
  // 1に到達したときのステップ数をメモ化
  // 注意: この問題は「nが1になるまでの手数」を求める問題であり、
  // 既存のCollatz問題の典型的な解法（再帰的または動的計画法）を適用する必要があります。
  // ここでは、各nについて1に到達するまでのステップ数を計算し、それを合計します。
  
  // 再計算（メモ化をより適切に行うために、再帰的に計算し、呼び出し元で結果を合計する形に変更します）
  
  // 簡略化のため、ここでは直接計算を試みます。
  // 厳密には、各クエリnに対してのみステップ数を計算し、その合計を求める必要があります。
  
  // 再度、クエリごとに計算とメモ化を統合します。
  
  // 処理を再構成します。
});

// 変更後の処理：すべての入力に対して計算を行い、合計を求める
let input_lines: number[] = [];
rl.on('line', (line) => {
    if (line.trim() === "") return;
    const n = parseInt(line.trim(), 10);
    if (!isNaN(n)) {
        input_lines.push(n);
    }
});

rl.on('end', () => {
    let total_sum = 0;
    const calculated_steps = new Map<number, number>();

    for (const n_start of input_lines) {
        if (n_start === 1) {
            // 1 の場合、手数は 0
            calculated_steps.set(n_start, 0);
            continue;
        }
        
        let current = n_start;
        let steps = 0;
        const path: number[] = []; // パスを記録して、すでに計算済みの値があれば利用するため
        
        while (current !== 1) {
            if (calculated_steps.has(current)) {
                steps += calculated_steps.get(current);
                break;
            }
            
            // パスを記録
            path.push(current);
            
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // 1に到達するまでの手数を計算し、パス上のすべての値をメモ化する
        if (current === 1) {
            // 逆順にメモ化を適用
            for (let i = path.length - 1; i >= 0; i--) {
                calculated_steps.set(path[i], steps - (path.length - 1 - i));
            }
            total_sum += steps;
        }
    }

    // 最終的な合計を出力
    console.log(`total=${total_sum}`);
});
