const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = 0;
let validLines = 0;

rl.on('line', (line) => {
  lines++;
  // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定
  const trimmedLine = line.trim();

  if (trimmedLine.length === 0) {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りで分割し、各要素を整数に変換してみる
  const parts = trimmedLine.split(',');
  let isValid = true;

  if (parts.length === 0) {
    // これは上記の空行チェックで既に除外されているはずだが念のため
    isValid = false;
  } else {
    // 全ての要素が整数に変換可能かチェック
    for (const part of parts) {
      if (part.trim() === "") {
        // カンマが連続する場合 (例: a,,b) や、単にカンマのみの場合も考慮。
        // 仕様では「空行、および数字とカンマ以外を含む行は妥当ではない」とあるため、
        // 連続するカンマや、数字とカンマ以外の文字が含まれる行は不適と判断する。
        // parts.filter(p => p.trim() !== "").length は、実質的な数値の数を示す。
        // 空の文字列がpartsに含まれることは、split(',')の挙動から、例: "1,,2" -> ["1", "", "2"] となる。
        // ここでは、空の文字列が混ざっている場合は不妥当とする。
        if (part.trim() === "") {
          isValid = false;
          break;
        }
      } else {
        // 整数であるかチェック
        if (!/^\d+$/.test(part.trim())) {
          isValid = false;
          break;
        }
      }
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
