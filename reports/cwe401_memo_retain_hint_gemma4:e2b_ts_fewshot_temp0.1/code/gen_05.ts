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
    // n=1 の場合は手数は 0
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
      // サイクルに陥った場合、このパスは無限ループになるため、
      // サイクル内の移動回数を考慮する必要があるが、
      // この問題は通常、3n+1問題の標準的な解法（サイクル検出）を適用する。
      // ここでは、サイクルに入った時点で、そのサイクル内の移動回数を加算する。
      // ただし、問題文の意図が「1に到達するまでの手数」なので、
      // サイクルに入ったら、そのサイクル内の移動回数を加算して終了する。
      // サイクル検出をより厳密に行うため、ここでは一旦、サイクル検出をパスにのみ使用する。
      // サイクル検出が成功すれば、その後の計算はサイクル内の移動回数で済む。
      // 簡略化のため、ここではサイクル検出が成功した時点で、その後の計算をスキップし、
      // サイクル内の移動回数を加算するロジックを導入する。
      
      // サイクル検出が成功した場合は、現在のパスの長さと、サイクル内の移動回数を計算する。
      // この問題は、サイクル検出が成功した時点で、そのサイクル内の移動回数を加算して終了する。
      // 簡略化のため、ここではサイクル検出が成功した時点で、その後の計算を終了させる。
      // 実際には、サイクル内の移動回数を計算し、それを加算する必要がある。
      // サイクル検出が成功した場合は、その後の計算を終了する。
      break; 
    }
    
    path.add(current);
    
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    count++;
  }

  // 1に到達したか、またはサイクル検出で処理が終了した後の処理
  if (current === 1) {
    memo.set(n, count);
    total_count += count;
  } else if (path.has(current)) {
    // サイクルに陥った場合、サイクル内の移動回数を計算して加算する
    // サイクル検出が成功した時点で、pathに含まれる要素がサイクルを構成している。
    // サイクル内の移動回数を計算し、それを加算する。
    // サイクル検出が成功した時点で、countはサイクルに入る直前のステップ数になっている。
    // サイクル内の移動回数を計算し、それを加算する。
    
    // サイクル内の移動回数を再計算する（より安全な方法）
    let cycle_len = 0;
    let cycle_start = -1;
    let temp = n;
    const cycle_path = new Set<number>();
    
    while (temp !== 1 && !cycle_path.has(temp)) {
        cycle_path.add(temp);
        temp = (temp % 2 === 0) ? temp / 2 : 3 * temp + 1;
    }
    
    if (temp === 1) {
        // 1に到達した場合（これは既に上のパスで処理されているはずだが、念のため）
        memo.set(n, count);
        total_count += count;
    } else if (cycle_path.has(temp)) {
        // サイクルに陥った場合
        cycle_start = temp;
        cycle_len = 0;
        let runner = cycle_start;
        do {
            cycle_len++;
            runner = (runner % 2 === 0) ? runner / 2 : 3 * runner + 1;
        } while (runner !== cycle_start);
        
        // サイクル内の移動回数を加算
        const steps_to_cycle = count; // サイクルに入る直前のステップ数
        const steps_in_cycle = cycle_len;
        
        // サイクル内の移動回数を加算
        // サイクルに入るまでのステップ数 (count) + サイクル内のステップ数 (cycle_len)
        // ただし、countはnからサイクルに入ったまでのステップ数。
        // サイクルに入った後の残りステップは、サイクル内の移動回数で計算される。
        
        // サイクル検出が成功した時点で、countはサイクルに入る直前のステップ数。
        // サイクル内の移動回数を加算する。
        memo.set(n, count + cycle_len);
        total_count += count + cycle_len;
    } else {
        // 上記のロジックでカバーされない場合（通常は到達しないはず）
        memo.set(n, count);
        total_count += count;
    }
  } else {
    // 1に到達した場合
    memo.set(n, count);
    total_count += count;
  }
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
