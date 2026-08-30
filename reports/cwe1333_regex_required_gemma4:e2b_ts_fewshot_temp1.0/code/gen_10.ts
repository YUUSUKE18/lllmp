const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    let validLines = 0;
    const regex = /^(\d+(,\d+)*)\.?$|^,\s*$/;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // カンマ区切りの整数列のパターンをチェック
        // 1. 数字とカンマのみで構成されているか
        // 2. 末尾にカンマがあっても良い（例: "1,2," はOK）
        // 3. 数字とカンマ以外の文字が含まれていないか
        const match = line.match(/^(\d+(,\d+)*)?(\s*,\s*)*$/);
        
        // より厳密な正規表現で「1個以上の数字列がカンマで区切られている」ことを確認する
        // 整数列のパターン: \d+(,\d+)*
        // 末尾にカンマがあっても良い (?:,)?
        const validPattern = /^(\d+(,\d+)*)(,?)$/;
        
        if (validPattern.test(line)) {
            // 妥当な行数としてカウントする (空行を除く)
            validLines++;
        }
    }

    console.log(`valid=${validLines}`);
});
