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

    if (Number.isNaN(n)) return;

    if (n === 1) {
        // 1 の場合は手数は 0
        const count = 0;
        total_count += count;
        process.stdout.write(`total=${total_count}\n`);
        rl.close();
        return;
    }

    if (memo.has(n)) {
        const count = memo.get(n)!;
        total_count += count;
        return;
    }

    let steps = 0;
    let current = n;

    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }

    // 1 に到達した後の手数をメモ
    memo.set(n, steps);
    total_count += steps;
});

rl.on('close', () => {
    // このロジックは、すべての入力が処理された後にのみ実行されるべきだが、
    // 上記のロジックでは、1が入力された時点で終了させているため、
    // 実際には入力ストリーム全体を処理するのではなく、
    // 1つのクエリに対する計算結果を求める形になる。
    // 仕様を再確認すると、「すべてのクエリの手数の合計を求めます」となっているため、
    // 読み込んだすべての行に対して計算を行い、最後に合計を出力する必要がある。
    // したがって、再構成する。
});

// 再構成：すべての入力を読み込んでから計算する
const inputLines: string[] = [];
rl.on('line', (line) => {
    inputLines.push(line);
});

rl.on('close', () => {
    let total_sum = 0;
    const memo_final = new Map<number, number>();

    for (const line of inputLines) {
        if (line.trim() === "") continue;
        const n = parseInt(line.trim(), 10);

        if (Number.isNaN(n)) continue;

        if (n === 1) {
            total_sum += 0;
            continue;
        }

        if (memo_final.has(n)) {
            total_sum += memo_final.get(n)!;
            continue;
        }

        let steps = 0;
        let current = n;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        memo_final.set(n, steps);
        total_sum += steps;
    }

    console.log(`total=${total_sum}`);
});
