import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('valid=0');
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視
        const trimmedLine = line.trim();

        if (trimmedLine === '') {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているか、または数字とカンマで終わっているかをチェックする
        // 妥当な形式: 1個以上の数字とカンマの組み合わせ。
        // 許容されるパターン: 数字とカンマのみ。末尾のカンマは許容。
        // 妥当な行は、数字とカンマのみで構成されている。
        // 例: "1,2,3", "1,2,", "1"
        
        // 1. 数字とカンマのみで構成されているかを確認する
        // 許容される文字セット: 数字 (0-9) と カンマ (,)
        const validCharsOnly = /^[0-9,]*$/.test(trimmedLine);

        if (!validCharsOnly) {
            // 数字とカンマ以外の文字が含まれている場合は妥当ではない
            continue;
        }

        // 2. 1個以上の数字列がカンマで区切られているか、または単一の数字列であるかを確認する
        // 妥当な行は、カンマで区切られた整数列である。
        // これは、カンマで区切られた要素が少なくとも1つ存在することを意味する。
        
        // カンマで分割し、空の要素がないかを確認する。
        // 末尾のカンマがあっても、split(',')の結果は空文字列を含む可能性がある。
        // 例: "1,2,".split(',') -> ["1", "2", ""]
        // 例: "1".split(',') -> ["1"]
        
        const parts = trimmedLine.split(',');
        
        // 妥当であるためには、少なくとも1つの要素（数字列）が存在する必要がある。
        // 空行は既に除外されているため、このチェックは、数字が少なくとも1つ含まれているかを確認する。
        // ただし、" , " のようなケースは、validCharsOnlyで既に除外されているはず。
        // "1," の場合、parts=["1", ""], parts.length >= 1。これは妥当と見なす。
        // "1,2" の場合、parts=["1", "2"], parts.length >= 1。これは妥当と見なす。
        
        // 妥当性の定義: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、文字列が空でなく、数字とカンマのみで構成されていれば、
        // 少なくとも1つの要素（数字列）が存在するため、満たされると解釈する。
        
        if (parts.length >= 1) {
            // 念のため、要素がすべて数字列であることを確認する（validCharsOnlyで既に保証されているが、念のため）
            const allAreNumbers = parts.every(part => /^[0-9]*$/.test(part));
            
            if (allAreNumbers) {
                validCount++;
            }
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
