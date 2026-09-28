import { ReadLine } from 'readline';

const rl = ReadLine.fromprocess.stdin;

function solve() {
    const memo: Map<number, number> = new Map();

    function steps(n: number): number {
        if (n === 1) return 0;
        
        // メモ化チェック
        if (memo.has(n)) return memo.get(n)!;

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        const res = steps(nextN) + 1;
        memo.set(n, res);
        return res;
    }

    let total = 0n; // 合計は 64bit 整数で扱うため BigInt を使用

    rl.on('line', (line) => {
        const trimmed = line.trim();
        if (!trimmed) return; // 空行は無視

        const parsed = parseInt(trimmed, 10);
        if (isNaN(parsed)) return; // 整数として解釈できない行は無視

        if (parsed < 1) return; // 1 以上の整数のみ

        const count = steps(parsed as number);
        total += BigInt(count);
    });

    rl.on('close', () => {
        console.log(`total=${total}`);
    });
}

solve();
