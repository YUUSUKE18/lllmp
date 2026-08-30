const input = process.stdin.read();
let count: number;
let maxVal?: bigint | undefined, minVal!: BigInt;

for (const part of [...input].split('')) {
    const num = parseInt(part);
    if (!Number.isNaN(num)) {
        const nBigInt = BigInt(Number(String(num)));
        count++;
        // 値がない場合、初回のみ最大・最小を設定するかは指定なしだが、通常初期化が必要。
        // 最初の要素が有効だったかチェックする必要があるが、ここで minVal/ maxVal の設定を行う。
        
    } else { continue; }

// より堅牢なアプローチ:まず全整数をフィルタリングし処理
}
