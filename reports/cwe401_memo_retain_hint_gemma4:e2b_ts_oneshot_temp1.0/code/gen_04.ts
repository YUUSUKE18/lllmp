const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    const initialN = parseInt(lines[0], 10);
    if (isNaN(initialN) || initialN < 1) {
        // 最初の行が不正な場合は、無視するか、適切な処理を行うが、ここでは問題の制約に従い、1以上の整数が1行に1個ずつあると仮定し、最初の行を処理対象とする
        // ただし、問題文の「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」に従うため、ここでは最初の値をクエリとする
        // もし最初の入力がクエリではなく、無視すべきものであれば、ここで処理を変更する必要があるが、ここでは最初の行を最初のクエリと見なす
        // 厳密には、入力全体が「クエリ」の列であり、1行に1個ずつであるため、lines[0]が最初のクエリである。
        // もし入力が「1 2 3 ...」のようにスペース区切りで与えられていると解釈するなら、以下のように処理する。
        // 「1 以上の整数が 1 行に 1 個ずつ並びます」という記述から、各行が1つのクエリだと解釈し、最初の行を最初のクエリとして処理する。
    }

    // スタックとメモ化
    const memo = new Map<number, number>();
    const stack = [initialN];
    let totalSteps = 0;

    // 処理対象のスタックから、1に到達するまでのステップを計算する関数
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        const nextN = n % 2 === 0 ? n / 2 : 3 * n + 1;
        const steps = 1 + calculateSteps(nextN);
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリについて計算と合計を求める
    for (let i = 1; i < lines.length; i++) {
        const n = parseInt(lines[i], 10);
        if (isNaN(n) || n < 1) continue;
        
        // メモ化を再利用してステップを計算
        const steps = calculateSteps(n);
        totalSteps += steps;
    }

    console.log(`total=${totalSteps}`);
}

solve();
