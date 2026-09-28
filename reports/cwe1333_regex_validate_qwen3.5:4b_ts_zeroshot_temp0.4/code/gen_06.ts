import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');

let validCount = 0;

for (const line of input.split('\n')) {
    const trimmedLine = line.trim();
    
    if (trimmedLine === '') {
        continue;
    }

    // 数字とカンマ以外が含まれているかチェック
    const hasInvalidChar = /[^\d,]/.test(trimmedLine);
    if (hasInvalidChar) {
        continue;
    }

    // カンマなしの行は妥当ではない（1 個以上の数字列が必要）
    if (!trimmedLine.includes(',')) {
        continue;
    }

    // 分割して数え上げる
    const parts = trimmedLine.split(',');
    
    for (const part of parts) {
        // 空白を含む部分があるかチェック（trim が空でないか確認）
        if (part.trim() === '') {
            break; 
        }
        
        // 数字のみであるかチェック
        const isDigit = /^\d+$/.test(part);
        if (!isDigit) {
            break;
        }
    }

    // 分割された部分の中に少なくとも 1 つの有効な数字があるか確認
    // 上記ループで break したかどうかは、最後の要素が有効か判断する必要がある。
    // より直接的な判定：すべての要素が数字のみであること + カンマが存在すること
    
    // 再考: "末尾のカンマは許容します" -> ",1,2," は OK. "1,2," の分割は ["1", "2", ""]
    // "1,2" の分割は ["1", "2"]
    // 条件: 1 個以上の数字列。
    
    const isValid = parts.every(p => /^\d+$/.test(p.trim())) && parts.length > 0;
    
    // または、カンマが存在し、かつすべてのトークンが数値であること。
    // 空のトークン（末尾カンマによる）は無視して良いか？ "1," -> ["1", ""]
    // 仕様: "1 個以上の数字列"。"" は数字列ではない。
    // しかし、分割結果に空文字が含まれても、実際の数字列が存在すれば OK と解釈すべきか？
    // "末尾のカンマは許容します" を考えると、",1,2," -> ["", "1", "2", ""] のようなケースがある。
    // ここでは、有効な数字列が少なくとも 1 つあることを条件とする。
    
    const hasValidNumber = parts.some(p => /^\d+$/.test(p.trim()));
    
    if (hasValidNumber) {
        validCount++;
    }
}

console.log(`valid=${validCount}`);
