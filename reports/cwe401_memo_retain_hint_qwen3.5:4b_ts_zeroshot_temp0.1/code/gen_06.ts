const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const prev = memo.get(n);
    if (prev !== undefined) return prev;

    let steps = 0;
    while (true) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
        if (n === 1) break;
    }

    memo.set(n, steps);
    return steps;
}

function main() {
    const lines = process.stdin.read().split('\n');
    let totalSteps = 0;

    for (const line of lines) {
        if (!line.trim()) continue;
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;

        if (n < 1) continue;

        // 既に計算済みの値がある場合のみメモ化を使用し、再計算を避ける
        // ただし、問題文の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し」という定義に従い、
        // 各ステップごとに結果をメモ化する実装とする。
        // 効率的に計算するために、現在の値から 1 へ辿る際、途中の値もメモ化対象とする。
        
        let current = n;
        let stepsForN = 0;

        while (current !== 1) {
            if (memo.has(current)) {
                // 既に計算済みの節がある場合、その節から 1 へ辿る必要があるが、
                // メモ化された値は「現在の値から 1 への総手数」を示す。
                // しかし、Collatz 関数は「n から 1 への手数」を返すため、
                // memo.get(current) が既に計算済みの場合、その値そのままを使用できる。
                stepsForN = memo.get(current)!;
                break;
            }

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            stepsForN++;
        }

        // 計算結果をメモ化
        memo.set(n, stepsForN);

        totalSteps += stepsForN;
    }

    console.log(`total=${totalSteps}`);
}

main();
