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

    for (const line of lines) {
        // 行の前後の空白を無視する（trimを使用）
        const trimmedLine = line.trim();

        if (trimmedLine === '') {
            // 空行は妥当ではない
            continue;
        }

        // 妥当性のチェック
        // 1. 数字とカンマのみで構成されているかを確認する
        // 正規表現: ^[0-9,]*$ (行の先頭から末尾まで、数字またはカンマのみ)
        const contentRegex = /^[0-9,]*$/;
        if (!contentRegex.test(trimmedLine)) {
            // 数字とカンマ以外の文字が含まれている場合は妥当ではない
            continue;
        }

        // 2. 少なくとも1つの数字が含まれているかを確認する
        // 数字が一つもない場合（例: "," や ",,"）は妥当ではない
        const hasDigit = /[0-9]/.test(trimmedLine);
        
        if (hasDigit) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
