import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === '') {
        console.log('valid=0');
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    // 妥当性の判定に使用する正規表現
    // パターン: 
    // ^                  : 行の開始
    // (\d+(?:,\d+)*)     : 1つ以上の数字列（\d+）が、カンマと数字の繰り返し（(?:,\d+)*）で区切られている構造
    // (?:,)?             : 最後の要素の後に、オプションでカンマが続く（末尾のカンマを許容するため）
    // $                  : 行の終了
    // このパターンは、少なくとも1つの数字列が含まれ、数字とカンマ以外の文字を含まないことを保証します。
    const validationRegex = /^(\d+(?:,\d+)*)(?:,)?$/;

    for (const line of lines) {
        // 行の前後の空白を無視するため、行をトリムする
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 正規表現で妥当性を判定
        if (validationRegex.test(trimmedLine)) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
