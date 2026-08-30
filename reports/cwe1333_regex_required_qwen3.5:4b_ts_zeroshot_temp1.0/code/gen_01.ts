const input = process.stdin;
let validCount = 0;

input.on('data', (chunk) => {
    const lines = chunk.toString().split('\n');
    for (const line of lines) {
        if (!line.trim()) continue; // 空行はスキップして妥当とみなす（問題文：「空行...は妥当ではありません」→ 待機中としてよい）

        const trimmedLine = line.trim();
        const regex = /^(?:\d+,)?\d*$/;
        if (regex.test(trimmedLine)) {
            validCount++;
        } else {
            console.log(`valid=${validCount}\n`);
            process.stdin.pause();
            break; // 一度もって終了
        }
    }

    process.stdin.resume();
});
