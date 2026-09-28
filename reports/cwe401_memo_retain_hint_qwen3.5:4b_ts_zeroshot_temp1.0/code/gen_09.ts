const memo = new Map<number, number>();

function computeSteps(n: number): number {
    if (n === 1) return 0;
    const prev = memo.get(n);
    if (prev !== undefined) return prev;

    let steps = 0;
    while (true) {
        if (n % 2 === 0) {
            n = Math.floor(n / 2);
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }

    memo.set(n, steps);
    return steps;
}

function main(): void {
    let line: string;
    const total: number[] = [];

    while (true) {
        line = process.stdin.read().trim();
        if (!line) break;
        
        // 空行や整数ではない行は無視する（ただし、問題文では「1 以上の整数が 1 行に 1 個ずつ並びます」とあるので、
        // 今回はデフォルトとして有効な数値のみ処理し、無効な場合はスキップまたは例外ですが、
        // 「空行は無視し、整数として解釈できない行も無視します」という制約があるため、parseInt で解析し、
        // 失敗した場合はループを続けることで無視する実装とする。ただし、問題文の前提は「1 以上の整数が 1 行に 1 個ずつ並びます」なので、
        // 入力自体が常に有効な整数であると想定しても良いが、指定通り柔軟に対応するため、解析失敗時はスキップ。）

        const num = parseInt(line, 10);
        if (isNaN(num)) continue; 

        if (num < 1) continue;

        const steps = computeSteps(num);
        total.push(steps);
    }

    console.log(`total=${total.reduce((a, b) => a + b, 0)}`);
}

main();
