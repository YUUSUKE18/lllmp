import { Readline } from 'readline';

const rl = new Readline(process.stdin);

rl.on('data', (data) => {
    const input = data.toString().trim();
    if (!input || !isNaN(Number(input))) return; // 空または無効な入力の場合、処理しない（ただし仕様は「整数として解釈できない要素も無視」なので、単一の数字が入力された場合でもそれ自体をリストに含めるべきか。通常カンマ区切りだが、例外的にも扱う）

    const parts = input.split(',').map(s => {
        // 空白除去と数値チェック
        return s.trim();
    }).filter(part => !isNaN(Number(part)));

    if (parts.length === 0) return;

    let sum: bigint = BigInt(0);
    const counts = new Map<number, number>();

    for (const part of parts) {
        // 数値を整数に変換（BigInt で扱うため、文字列から直接変換）
        if (!isNaN(Number(part))) {
            const num = Number(part);
            
            // 重複カウント
            counts.set(num, (counts.get(num) || 0) + 1);

            // 合計に追加
            sum += BigInt(num);
        } else {
            continue; 
        }
    }

    console.log(`count=${Object.keys(counts).length} sum=${sum.toString()}`);
});

rl.on('close', () => {});
