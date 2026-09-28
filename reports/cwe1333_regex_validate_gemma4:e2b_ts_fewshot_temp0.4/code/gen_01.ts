const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validLines = 0;
  for (const line of lines) {
    // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
    // 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」場合。
    // 末尾のカンマは許容される。
    
    // 1. 行全体をトリムして、カンマで分割する
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 2. 末尾のカンマを削除して、数字のみの文字列として評価する
    let content = trimmedLine;
    if (content.endsWith(',')) {
      content = content.slice(0, -1);
    }

    // 3. カンマで分割し、各要素が数字のみで構成されているかを確認する
    const parts = content.split(',');
    let isValid = true;
    
    // 少なくとも1つの要素が存在し、その要素が全て数字のみで構成されているかを確認する
    if (parts.length === 0) {
        // これは、元の行がカンマのみ（例: "," や ",,"）だった場合など、特殊なケース。
        // 仕様では「1個以上の数字列がカンマで区切られて並んでいる」必要があるため、
        // 数字列が一つも存在しない場合は不適。
        isValid = false;
    } else {
        for (const part of parts) {
            // 各部分をトリムして、それが空でないか、そして数字のみかを確認する
            const trimmedPart = part.trim();
            if (trimmedPart === "") {
                // カンマが連続している場合（例: "1,,2" の中間）
                // これは「数字列」ではないため、妥当ではないとする。
                isValid = false;
                break;
            }
            // 正規表現で数字のみ（または数字とカンマのみ）であることを確認する。
            // ここでは、各要素が「整数」として解釈できるか、つまり数字とカンマのみで構成されているかを確認する。
            // 仕様の厳密な解釈に基づき、各要素が「数字列」である必要がある。
            if (!/^\d+$/.test(trimmedPart)) {
                isValid = false;
                break;
            }
        }
    }

    if (isValid) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
