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
        // 行の前後の空白を無視
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているか、または数字列がカンマで区切られているかを判定する
        // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」
        // これは、カンマで区切られた数字のシーケンスである必要がある。
        
        // 1. 数字とカンマ以外の文字が含まれていないかチェック
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue; // 数字とカンマ以外を含む行は妥当ではない
        }

        // 2. 妥当性の判定: 1個以上の数字列がカンマで区切られているか
        // 妥当なパターン: 数字の連続とカンマの連続が交互に現れる、またはカンマで区切られている。
        
        // 処理を簡略化するため、行をカンマで分割し、各要素が数値であることを確認する。
        // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」なので、
        // 各要素が空でないことを確認すれば十分である。
        
        // 行の末尾のカンマを削除して処理を簡略化する
        const processedLine = trimmedLine.endsWith(',') ? trimmedLine.slice(0, -1) : trimmedLine;

        if (processedLine === "") {
            // 末尾がカンマのみ（例: ","）または空文字列になった場合、これは妥当ではない（数字列が0個になるため）
            continue;
        }

        const parts = processedLine.split(',');
        
        // 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」
        // つまり、分割された要素が全て空でない必要がある。
        // ただし、元の行が "1,2," の場合、split(',') は ["1", "2", ""] になる。
        // 末尾のカンマが許容されるため、空の要素が含まれるのは末尾のみ。

        let hasValidNumbers = false;
        for (const part of parts) {
            if (part.trim() !== "") {
                // 数字列として存在する
                hasValidNumbers = true;
            }
        }
        
        // 妥当なのは、少なくとも1つの数字列が存在する場合。
        // 例: "1" -> ["1"] -> true
        // 例: "1,2," -> split -> ["1", "2", ""] -> true
        // 例: "," -> split -> ["", ""] -> false (空行チェックで除外されるはずだが、ここでは内部で判定)
        
        // 空行や数字とカンマ以外を含む行は既に除外されている。
        // 妥当なのは、カンマで区切られた数字列が少なくとも1つ存在する行。
        if (hasValidNumbers) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
