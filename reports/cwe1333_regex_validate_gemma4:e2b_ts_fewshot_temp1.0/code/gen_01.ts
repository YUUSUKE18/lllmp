const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validLines = 0;
  for (const line of lines) {
    // 行の前後の空白を無視してチェック
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // 1. 数字とカンマ以外を含むかチェック
    // 正規表現で、数字、カンマ、およびそれ以外の文字が含まれていないかチェック
    const validChars = /^[0-9,]*$/;

    if (!validChars.test(trimmedLine)) {
      // 数字とカンマ以外を含む行は妥当ではない
      continue;
    }

    // 2. カンマ区切りの整数列が1個以上あるかチェック
    // 末尾のカンマは許容される。
    // 例えば "1,2," は有効、"1," は有効、"" は無効（既に空行チェックで除外済み）

    // カンマで分割し、空でない要素があるか確認する
    // 末尾のカンマがある場合、最後の要素は空文字列になる。
    const parts = trimmedLine.split(',');
    
    // 末尾のカンマが残っている場合、最後の要素が空になる。
    // 例: "1,2," -> ["1", "2", ""]
    // 例: "1,2" -> ["1", "2"]
    
    // 妥当なのは、少なくとも1つの数字列が存在する場合。
    // 空行チェックで除外されているため、残っている文字列が数字またはカンマのみで構成されていることが保証されている。
    // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を満たすには、
    // 分割後に少なくとも1つの要素が数字（または数字の集合）を含む必要がある。
    
    // 各要素をトリムして、実際に数字列が入っているか確認する
    const actualParts = parts.map(p => p.trim());
    
    // フィルタリングされた部分（空でないもの）が存在すればOK
    if (actualParts.some(p => p.length > 0)) {
        validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
