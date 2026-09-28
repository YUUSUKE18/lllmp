import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];

    rl.on('line', (line) => {
        lines.push(line.trim());
    });

    rl.on('close', () => {
        if (lines.length === 0) {
            // 入力が全くなかった場合は何もしない（仕様上、1行目がないことは想定されないが安全のため）
            return;
        }

        // 1行目から個数を取得
        const countStr = lines[0];
        const expectedCount = parseInt(countStr, 10);

        let actualNumbers: number[] = [];
        let sum: bigint = 0n;
        let validCount = 0;

        // 2行目以降をチェック
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line === "") continue;

            const num = parseInt(line, 10);

            // 整数として解釈可能かチェックし、64bitの範囲内かチェック (数値として読み取れたものを対象とする)
            if (!isNaN(num)) {
                // 64bitの範囲内であるという保証があるため、そのまま処理する
                actualNumbers.push(num);
                sum += BigInt(num);
                validCount++;
            }
        }

        // 仕様: 実際に読み取れた整数だけを対象とする
        const actualReadCount = actualNumbers.length;
        const totalSum = sum;

        // 出力: count=<実際に読み取れた個数> sum=<合計>
        console.log(`count=${actualReadCount} sum=${totalSum.toString()}`);
    });
}

solve();
