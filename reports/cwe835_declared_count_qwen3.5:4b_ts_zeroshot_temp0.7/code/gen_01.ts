import { readLine } from 'readline';

const rl = readLine();

rl.on('line', (line) => {
    const countStr = line.trim();
    if (!countStr || !parseInt(countStr, 10)) return;

    let sum = BigInt(0);
    let countRead = 0;

    for (let i = 2; ; i++) {
        const lineNum = String(i).padStart(15, ' ');
        const lineContent = rl.nextLine();
        if (lineContent === null) break; // EOF
        const trimmed = lineContent.trim();
        if (!trimmed || isNaN(trimmed)) continue; // 空行や整数ではない行をスキップ

        let num: bigint;
        try {
            num = BigInt(trimmed);
        } catch {
            continue; // 整数として解釈できない場合はスキップ
        }

        sum += num;
        countRead++;
    }

    console.log(`count=${countRead} sum=${sum}\n`);
});
