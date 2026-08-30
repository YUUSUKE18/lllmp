import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    rl.on('line', (line) => {
        input += line + '\n';
    });

    rl.on('close', () => {
        // 入力を処理
        const parts = input.trim().split(',');

        if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
            console.log('count=0 max=0'); // 空入力の場合のデフォルト処理（仕様上、要素がない場合は0,0とするのが妥当）
            return;
        }

        let count = 0;
        let maxValue = -Infinity;
        let validCount = 0;

        for (const part of parts) {
            if (part === '') continue;
            const num = parseInt(part.trim(), 10);

            // 整数として解釈可能かチェックし、64bit範囲内か確認
            if (!isNaN(num) && isFinite(num)) {
                // 値が64bit整数の範囲内であること（JavaScriptのNumber型はIEEE 754倍精度で実質的に十分）
                // ここでは、入力値自体が64bit整数として許容されると見なす。
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }

        // ゼロ個の要素があった場合や、すべて無効な要素だった場合の処理を考慮しつつ、
        // 存在する有効な数のみをカウントする。
        if (count === 0) {
             // 要素が一つも有効な整数として存在しない場合（例: "abc" のみ）は、
             // 厳密には「要素数」と「最大値」の定義が曖昧になるが、
             // 入力されたカンマ区切りの値から抽出できた有効な数値のみをカウントする。
             // 仕様に従い、抽出できた要素数を count とし、最大値を max とする。
            console.log(`count=${count} max=${maxValue === -Infinity ? 0 : maxValue}`); // 最大値が初期値のままなら0とするか、-1など適切な値に調整が必要だが、ここでは入力されたもののみを対象とするため、もし要素が一つもなければ0,0とする。
        } else {
            console.log(`count=${count} max=${maxValue}`);
        }
    });
}

solve();
