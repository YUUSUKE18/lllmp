const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let inputLines: string[] = [];
rl.on('line', (line) => {
  inputLines.push(line.trim());
});

rl.on('close', () => {
  let total = 0;
  const memo = new Map<number, number>();

  for (const line of inputLines) {
    if (line === "") continue;

    let n: number;
    const num = parseInt(line, 10);

    if (isNaN(num)) continue;
    n = num;

    if (n === 1) {
      total += 0;
      continue;
    }

    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }

    // BFS/DP的なアプローチで計算し、メモ化する
    const queue: number[] = [n];
    const visited = new Set<number>([n]);
    let count = 0;
    let head = 0;

    while (head < queue.length) {
      const current = queue[head++];
      
      if (current === 1) {
        // この経路の長さは、スタート地点からの手数なので、そのまま加算
        // ただし、この問題は「1に到達するまでの手数」を問うているため、
        // 探索の深さ（ステップ数）を記録する必要がある。
        // 以下のDP/Memoizationのアプローチに切り替える。
        // このままでは計算が複雑になるため、純粋なDP/Memoizationを適用する。
      }

      let nextN: number;
      if (current % 2 === 0) {
        nextN = current / 2;
      } else {
        nextN = 3 * current + 1;
      }

      if (!visited.has(nextN)) {
        visited.add(nextN);
        queue.push(nextN);
      }
    }
    
    // 適切なメモ化/計算ロジック（3n+1問題とMemoizationの組み合わせ）
    // ここでは、再帰とメモ化でシンプルに実装する。
    const calculateSteps = (start: number): number => {
        if (start === 1) {
            return 0;
        }
        if (memo.has(start)) {
            return memo.get(start)!;
        }

        let steps = Infinity;
        
        // 偶数なら n/2
        if (start % 2 === 0) {
            const next = start / 2;
            const subSteps = calculateSteps(next);
            if (subSteps !== Infinity) {
                steps = subSteps + 1;
            }
        } else {
            // 奇数なら 3n+1
            const next = 3 * start + 1;
            const subSteps = calculateSteps(next);
            if (subSteps !== Infinity) {
                steps = subSteps + 1;
            }
        }
        
        // 1に到達できない場合はInfinityを返す（理論上は3n+1問題では必ず到達するが、ここでは安全のため）
        if (steps === Infinity) {
            memo.set(start, Infinity);
            return Infinity;
        }

        memo.set(start, steps);
        return steps;
    };

    const result = calculateSteps(n);
    
    if (result !== Infinity) {
        total += result;
    }
  }

  console.log(`total=${total}`);
});
