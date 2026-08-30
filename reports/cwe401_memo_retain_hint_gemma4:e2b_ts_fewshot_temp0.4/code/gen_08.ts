const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;

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

  // 再帰的または反復的に計算
  let count = 0;
  let current = n;
  const path = new Set<number>(); // サイクル検出用

  while (current !== 1) {
    if (path.has(current)) {
      // サイクル検出。サイクル内の計算は、サイクルに入った時点での累積値を考慮する必要があるが、
      // この問題は「1に到達するまでの手数」を求めるため、サイクルに入ったらそのサイクルを無視するか、
      // サイクル内の移動回数を加算する必要がある。
      // ここでは、サイクルに入った場合は、そのサイクルからの移動回数を計算し、
      // 1に到達するまでのパスを再評価する（または、サイクルが1に到達しない場合は無限ループを避けるため、
      // サイクル内の移動回数を加算する）。
      // サイクル検出は、到達した値が既に計算済みかどうかをチェックするだけで十分。
      // ここでは、より単純に、到達した値が既に計算済みならその結果を使う、というメモ化のロジックに従う。
      // サイクル検出は、計算の効率化のため、到達した値がまだ計算中かどうかを追跡する。
      // 今回は、メモ化の仕組みを最大限に活用するため、サイクル検出は、
      // サイクルに入った時点で、そのサイクル内の移動を考慮して終了させる。
      // しかし、この問題は「1に到達するまでの手数」なので、サイクルは1に到達しない限り、
      // 1に到達するまでのパスを計算し続ける必要がある。
      // サイクル検出を厳密に行うため、ここでは一旦、単純なメモ化に頼る。
      // サイクルが発生した場合、そのサイクルは1に到達しないため、無限ループになる可能性がある。
      // しかし、この問題は「3n+1問題」であり、1に到達することが保証されているため、
      // サイクルは発生しない（1に到達するパスのみを辿る）。
      // 念のため、サイクル検出を導入し、計算が無限に続かないようにする。
      break; // サイクル検出は、この問題の文脈では不要と判断し、メモ化に依存する。
    }
    path.add(current);

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    count++;
  }

  // 1に到達した後の結果をメモ化
  if (current === 1) {
    memo.set(n, count);
  }
  // 1に到達しなかった場合（理論上は発生しないはずだが）、エラー処理やログはしない。
});

rl.on('close', () => {
  // すべてのクエリが処理された後、合計を出力
  console.log(`total=${total_count}`);
});
