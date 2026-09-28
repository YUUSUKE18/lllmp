import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    // 行ごとに分割し、前後の空白を無視して処理する
    const lines = input.split('\n');
    
    let validCount = 0;
    
    // 妥当性の判定に使用する正規表現
    // ^[\d,]+$ : 行全体が、1文字以上の数字(\d)またはカンマ(,)のみで構成されていることを要求する。
    // これにより、空行や数字とカンマ以外の文字を含む行を除外する。
    // ただし、このパターンだけでは「1個以上の数字列」の条件を満たさない行（例: ",,"）も含む可能性があるため、
    // 実際には数字が少なくとも1つ含まれていることを確認する。
    const validationRegex = /^[\d,]+$/;

    for (const line of lines) {
        // 行の前後の空白を無視して判定するため、trim()を使用する。
        // ただし、仕様上「行の前後の空白は無視します」とあるため、ここでは行の内容そのものをチェックする。
        // 空行（trim()が空文字列になる）は自動的に除外される。
        
        // 行が空でないことを確認し、正規表現で妥当性を判定する
        if (line.trim().length > 0 && validationRegex.test(line)) {
            // さらに厳密に「1個以上の数字列」が存在するかを確認する。
            // 数字が1つ以上含まれていれば、それは「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすと見なす。
            if (/\d/.test(line)) {
                validCount++;
            }
        }
    }

    // 結果を出力
    process.stdout.write(`valid=${validCount}\n`);
}

solve();
