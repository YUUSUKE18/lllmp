const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_count = 0;

rl.on('line', (line) => {
    if (line.trim() === "") return;

    const n = parseInt(line.trim(), 10);

    if (isNaN(n)) return;

    if (n === 1) {
        // n=1 の場合の手数は 0
        // この問題では n=1 への到達手数を求めるため、n=1 を終了条件とする
        // n=1 は終了条件なので、再帰的に計算する際のベースケースとして考える。
        // ここでは nが1になったらその時点で処理を終了し、手数を返す。
        memo.set(n, 0);
        total_count += 0;
        return;
    }

    // メモ化された値があればそれを使用
    if (memo.has(n)) {
        // 既存のメモ化結果を合計に加算する
        total_count += memo.get(n)!;
        return;
    }

    // 再帰的/動的計画法で計算 (または直接計算)
    let steps = 0;
    let current = n;
    const history = new Set<number>(); // サイクル検出用

    while (current !== 1) {
        if (memo.has(current)) {
            // 既に計算済みの値に到達した場合
            steps += memo.get(current)!;
            break;
        }
        if (history.has(current)) {
            // サイクル検出。サイクル内での合計を計算し、現在の値に足して終了
            // この問題は1に到達する問題なので、サイクル内での処理は複雑になる可能性があるため、
            // 3n+1問題（コラッツ予想）の文脈では、サイクルに落ちるか、1に到達するかのどちらかになるため、
            // 単純に到達するまでのステップ数を求めることに焦点を当てる。
            // ここでは、サイクルに落ちた場合は、そのサイクルでの到達可能性を考慮する必要があるが、
            // 問題文は「1に到達するまでの手数を求めよ」とあるため、サイクルに落ちても1に到達しないなら無限ループと見なすか、
            // サイクル内で1に到達するパスを探索する必要がある。
            // しかし、一般的にこの問題は1に収束すると仮定して解かれるため、ここではサイクル検出を簡略化する。
            // サイクル内の計算は、もし1に到達しないなら、その計算は無限に続くことを意味する。
            // サイクル検出を行っても、計算が収束しない場合は、ここではまだ計算を続行する（あるいはエラー扱い）。
            // 念のため、サイクル検出はメモ化に依存し、無限ループを避けることを優先する。
            
            // シンプルに、サイクルに入ったら計算を停止する（1に到達しない場合、このパスは不適切）
            // 厳密には、この問題は1に収束することが暗黙の前提とされているため、ここではメモ化に頼る。
            break; 
        }
        
        history.add(current);
        
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }

    // 計算結果をメモ化
    // 注意: n=1 の場合、n=1への到達手数は 0 である。
    if (current === 1) {
        memo.set(n, steps);
        total_count += steps;
    } else if (!memo.has(n)) {
        // サイクルや計算の失敗（もしあれば）
        // この問題の性質上、通常は1に収束すると仮定されるため、到達しなかった場合は無視するか、エラーとする。
        // ここでは、到達しなかった場合はカウントしない（または無限に続くとして処理を継続しない）
    }
});

rl.on('close', () => {
    // 最終結果を出力
    console.log(`total=${total_count}`);
});
