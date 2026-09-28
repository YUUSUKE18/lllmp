const input = process.stdin.read();
if (input === null || input.length === 0) {
    console.log('total=0');
    process.exit(0);
}

const lines = input.split('\n');
const queryNumbers: bigint[] = [];

// メモ化用のマップ
const memo = new Map<bigint, bigint>();

function getSteps(n: bigint): bigint {
    // n が 1 のときの手数は 0
    if (n === 1n) return 0n;
    
    // メモ化済みかどうか確認
    if (memo.has(n)) return memo.get(n)!;

    let next = n;
    // 偶数なら n/2、奇数なら 3n+1
    if (n % 2n === 0n) {
        next = n / 2n;
    } else {
        next = 3n + 1n;
    }

    const stepsFromNext = getSteps(next);
    
    // メモ化：ステップ数 + 1 (現在のステップ数)
    memo.set(n, stepsFromNext + 1n);
    return stepsFromNext + 1n;
}

let totalSum: bigint = 0n;

for (const line of lines) {
    const trimmedLine = line.trim();
    // 空行は無視
    if (trimmedLine === '') continue;
    
    // 整数として解釈できない行も無視 (正規表現で確認)
    // 1 以上の整数とするため、数字のみをマッチします
    if (/^\d+$/.test(trimmedLine)) {
        const num = BigInt(trimmedLine);
        totalSum += getSteps(num);
    }
}

console.log(`total=${totalSum}`);
