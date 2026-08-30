process.stdin.setEncoding("utf8");

let validCount = 0;
let buffer = "";

process.stdin.on("data", (data: string) => {
    buffer += data;
});

process.stdin.on("end", () => {
    const lines = buffer.trim().split('\n').map(line => line.trim());
    
    // 正規表現: 1個以上の数字とカンマの組み合わせ、末尾にカンマがあっても良い
    // ^\s* : 行の先頭の空白
    // (?:[0-9,]+(?:,[0-9,]+)*) : 1つ以上の数字とカンマの組み合わせ (カンマ区切りの整数列)
    // (?:,|$) : カンマまたは行末
    // \s*$ : 行末の空白
    const validRegex = /^\s*(?:[0-9,]+(?:,[0-9,]+)*)(?:,)?\s*$/;

    for (const line of lines) {
        if (!line) continue; // 空行は妥当ではない

        // 末尾のカンマを無視し、数字とカンマのみが含まれているかを確認するロジックを正規表現で表現する
        // 妥当条件: 1個以上の数字とカンマがカンマで区切られている。末尾のカンマは許容される。
        
        // より厳密に、数字とカンマのみで構成されていることを確認する
        const isValid = /^[0-9,]+(?:,[0-9,]+)*,?$/.test(line);

        if (isValid) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
});
