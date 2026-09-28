import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("valid=0");
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視して処理
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているかを確認する
        // ^\s*       : 行頭の空白（無視される）
        // (?:      : 非キャプチャグループ開始
        //   \d+    : 1つ以上の数字
        //   ,?     : カンマ（0個または1個）
        // )+       : 上記グループが1回以上繰り返される
        // \d?      : 最後の数字（カンマの後に続く可能性があるため、末尾の数字が1つあればよい）
        // \s*$      : 行末の空白（無視される）
        
        // 仕様の再解釈：
        // 1. 1個以上の数字列がカンマで区切られて並んでいること。
        // 2. 数字とカンマ以外を含む行は妥当ではない。
        // 3. 末尾のカンマは許容する。
        
        // これは、行が「数字」と「カンマ」のみで構成されていることを確認し、
        // 少なくとも1つの数字が含まれていることを確認すれば良い、と解釈できる。

        let isValid = false;
        let hasDigits = false;
        let hasValidChars = true;

        for (let i = 0; i < trimmedLine.length; i++) {
            const char = trimmedLine[i];
            if (!/\d|\,|\s/.test(char)) {
                // 数字、カンマ、空白以外が含まれていたら不適
                hasValidChars = false;
                break;
            }
            if (/\d/.test(char)) {
                hasDigits = true;
            }
        }

        if (!hasValidChars) {
            continue; // 数字とカンマ以外を含む行は不適
        }

        // 数字とカンマのみで構成されている場合、少なくとも1つの数字が含まれている必要がある。
        if (hasDigits) {
            validCount++;
        }
        // 空行や、カンマのみ（例: "," や ",,"）はhasDigits=falseになるため不適。
    }

    console.log(`valid=${validCount}`);
}

solve();
