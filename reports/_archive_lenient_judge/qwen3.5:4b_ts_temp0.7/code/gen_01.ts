import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (input.length === 0) {
    console.log('count=0 sum=');
} else {
    const parts = input.split(',');
    let uniqueSet: Set<number> = new Set();
    
    for (const part of parts) {
        if (!isNaN(Number(part))) {
            const num = Number(part);
            // 重複を除くため、セットに直接追加するのではなく、既に存在するかチェック
            // ただし、仕様は「重複を除いた整数」の個数と合計なので、ユニークな値の数え上げが必要。
            if (!uniqueSet.has(num)) {
                uniqueSet.add(num);
            }
        }
    }

    const count = uniqueSet.size;
    let sum = 0n; // BigInt で計算してオーバーフロー防止（64bit 範囲とあるので Number でも可だが、安全に）
    
    for (const num of uniqueSet) {
        sum += BigInt(num);
    }

    console.log(`count=${count} sum=${Number(sum)}`);
}
