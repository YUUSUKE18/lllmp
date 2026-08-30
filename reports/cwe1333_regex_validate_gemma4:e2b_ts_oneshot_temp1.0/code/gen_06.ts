process.stdin.setEncoding('utf8');

let validCount = 0;
let linesRead = 0;

process.stdin.on('data', (data: string) => {
    const lines = data.trim().split('\n');
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") {
            // 空行は妥当ではない（1個以上の数字列がカンマで区切られている必要があるため）
            continue;
        }

        // 末尾のカンマを無視して、カンマで分割して、各要素が整数のみで構成されているかチェックする
        // 正規表現で、数字とカンマのみを含むことを確認し、カンマ区切りの整数列として妥当かを判定する
        // 妥当の定義: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容される。

        // 1. 末尾のカンマを削除して、カンマで分割する
        let content = trimmedLine;
        if (content.endsWith(',')) {
            content = content.slice(0, -1);
        }

        const parts = content.split(',');
        
        if (parts.length === 0) {
            // 例えば、入力がカンマのみの場合（例: "," または ","）、これは妥当ではない
            continue;
        }

        let isValid = true;
        for (const part of parts) {
            if (part.trim() === "") {
                // カンマが連続している場合（例: "1,,2"）、これは妥当ではない
                isValid = false;
                break;
            }
            // 各部分が整数のみで構成されているかチェック
            if (!/^\d+$/.test(part)) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            validCount++;
        }
    }
});

process.stdin.on('end', () => {
    console.log(`valid=${validCount}`);
});
