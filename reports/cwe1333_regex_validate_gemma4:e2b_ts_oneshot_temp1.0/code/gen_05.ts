const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validCount = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 正規表現で「カンマ区切りの整数列」の妥当性をチェック
  // ^\s*            : 行の先頭の空白
  // (?:             : 非キャプチャグループ
  //   \d+,\s*       : 1つ以上の数字とカンマ、それに続く空白（複数の数字列に対応）
  // )*              : 上記パターンが0回以上繰り返される（カンマで終わる場合や、数字のみの場合も考慮）
  // \d+             : 最後の数字列
  // (?:,\s*|$)      : カンマと空白、または行末
  // $               : 行末
  // より簡潔に、全ての要素が「数字、」で区切られているか、または数字のみであるかをチェックする。

  // 仕様の解釈に基づき、「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
  // これは、行が数字とカンマのみで構成されており、少なくとも1つの数字列が存在することを意味します。

  // 1. カンマと数字以外の文字が含まれていないかチェック
  if (!/^[0-9,]*$/.test(line)) {
    return; // 数字とカンマ以外を含む行は不妥当
  }

  // 2. 妥当な区切り方かチェック
  // 末尾のカンマは許容される。
  // 妥当な行は、カンマで区切られた整数列が1つ以上含まれていること。
  
  // 行をカンマで分割し、要素が数字（または空文字列）であるか確認する。
  const parts = line.split(',');
  let hasNumbers = false;
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
      hasNumbers = true;
    }
  }

  // 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいる。
  // これは、少なくとも1つの数字列が存在し、かつカンマのパターンが満たされている必要がある。
  // 例: "1,2,3" -> parts=["1", "2", "3"]。hasNumbers=true。妥当。
  // 例: "1," -> parts=["1", ""]。hasNumbers=true。妥当。
  // 例: ",," -> parts=["", "", ""]。hasNumbers=false。不妥当。
  // 例: "abc" -> 最初にフィルタリングされる。

  // 妥当な行は、カンマで区切られた要素のうち、少なくとも1つが整数である場合。
  // ただし、空行は既に除外されているため、数字が一つでもあれば妥当と見なす。
  if (hasNumbers) {
    validCount++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validCount}`);
});
