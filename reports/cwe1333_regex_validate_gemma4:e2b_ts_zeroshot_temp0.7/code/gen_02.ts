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
        // 行の前後の空白を無視する
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で「数字とカンマのみ」で構成されているかを確認する
        // ^\d+(,\d+)*$ のようなパターンは複雑になるため、より直接的にチェックする
        
        // 妥当な行の条件: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、行が数字とカンマのみで構成されており、少なくとも1つの数字が含まれていることを意味する。
        
        // 1. 数字とカンマ以外を含まないこと
        // 2. 少なくとも1つの数字が含まれていること (空行は既に除外済み)
        
        // 妥当な行の定義を再確認:
        // 「1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
        // 例: "1,2,3" -> 3つの数字列
        // 例: "1,2," -> 2つの数字列 (末尾のカンマは許容)
        // 例: ",," -> 0個の数字列ではない (空の数字列は許容されないと解釈)
        
        // 行をカンマで分割し、各要素が空でないことを確認する。
        // 末尾のカンマが許容されるため、trim()で前処理し、分割後に空でない要素があるか確認する。
        
        // 末尾のカンマを削除してチェックする
        let content = trimmedLine;
        if (content.endsWith(',')) {
            content = content.slice(0, -1);
        }
        
        // 1. 完全に数字とカンマのみで構成されているか？
        // 2. 少なくとも1つの数字が含まれているか？
        
        // 正規表現で検証する: 数字とカンマのみで構成され、数字が含まれていること。
        // 許容されるパターン: 数字とカンマの組み合わせ。
        // 例: "1,2,3" または "1,2,"
        // 数字のみで構成される行（例: "123"）も「1個の数字列」として妥当と解釈できるか？
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
        // これは、カンマ区切りが必須の構造を指していると解釈するのが自然。
        // もし「123」を妥当とするなら、カンマの有無に関わらず数字列が1つあれば良い。
        
        // 最も厳密な解釈: カンマで区切られていること。
        // カンマで区切られた要素が1つ以上存在し、それらが数字であること。
        
        const parts = content.split(',');
        
        let isValid = false;
        if (parts.length > 0) {
            // 各部分が空でない（数字列が存在する）ことを確認する
            const actualParts = parts.filter(p => p.length > 0);
            if (actualParts.length > 0) {
                // 各部分が整数であるかチェックする
                const allAreIntegers = actualParts.every(part => /^\d+$/.test(part));
                
                if (allAreIntegers) {
                    // 1個以上の数字列がカンマで区切られている
                    isValid = true;
                }
            }
        }

        if (isValid) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
