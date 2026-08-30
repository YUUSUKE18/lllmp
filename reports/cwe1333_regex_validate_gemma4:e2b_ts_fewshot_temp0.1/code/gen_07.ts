const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let validCount = 0;
  for (const line of lines) {
    // 末尾のカンマを許容しつつ、カンマ区切りの整数列が存在するかを判定する
    // 正規表現で、カンマで区切られた数字の塊が存在するかをチェックする
    // 許容されるパターン: 0個以上の数字とカンマの組み合わせ。ただし、少なくとも1つの数字列が存在する必要がある。
    // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
    
    // 行をカンマで分割し、各要素が数字のみ（または空文字列）であることを確認する
    const parts = line.split(',');
    let hasNumber = false;
    
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length > 0) {
            // 数字のみで構成されているかチェック
            if (/^\d+$/.test(trimmedPart)) {
                hasNumber = true;
            } else {
                // 数字とカンマ以外を含む場合は妥当ではない
                console.log(`valid=0`); // 妥当でない行が見つかった時点で終了（ただし、ここでは行ごとに判定する必要があるため、後で集計する）
                // このロジックでは、行ごとに判定し、最後に集計する。
            }
        }
    }

    // 妥当な行の判定ロジックを再定義:
    // 1. 空行は妥当ではない。
    // 2. 数字とカンマ以外を含む行は妥当ではない。
    // 3. 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。

    let is_valid = false;
    if (line.length > 0) {
        // 末尾のカンマを削除してチェックする（末尾のカンマは許容されるため）
        const processedLine = line.endsWith(',') ? line.slice(0, -1) : line;
        
        if (processedLine.length === 0) {
            // 空行またはカンマのみの行は妥当ではない
            is_valid = false;
        } else {
            // カンマで分割し、すべてが数字のみで構成されているか確認する
            const parts_strict = processedLine.split(',');
            let all_parts_are_digits = true;
            
            for (const part of parts_strict) {
                if (part.length > 0 && !/^\d+$/.test(part)) {
                    all_parts_are_digits = false;
                    break;
                }
            }
            
            if (all_parts_are_digits) {
                // 1個以上の数字列がカンマで区切られて並んでいるか？
                // 処理された文字列が空でないことを確認すれば、少なくとも1つの数字列が存在する。
                // 例: "1,2," -> processedLine = "1,2" -> parts_strict = ["1", "2"] -> 2個の数字列
                // 例: "," -> processedLine = "" -> is_valid = false (上記で処理済み)
                // 例: "1," -> processedLine = "1" -> parts_strict = ["1"] -> 1個の数字列
                
                // 妥当な行の条件を満たすためには、少なくとも1つの数字が含まれている必要がある。
                if (parts_strict.some(p => p.length > 0)) {
                    is_valid = true;
                } else {
                    is_valid = false;
                }
            } else {
                is_valid = false;
            }
        }
    }

    if (is_valid) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
