package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // 注意: スタンダードインプットを参照する必要がありますが、Go のbufio.NewReaderはnilではエラーになります。正しい書き方へ修正します。
	reader = bufio.NewReaderStdin()

	validCount := 0
	// 正規表現の構築
	// 数値 (整数): \d+
	// カンマ区切りの文字列: (\d+(,\d+)*)? または末尾カンマを含む場合は (\d+(,\d+)?)? ,?
	// より厳密に: 数字とカンマのみ。
	// パターン: ^[\s]*\d+(?:,\d+)*(?:,)?$|^\s*$ (空行も許容) -> しかし仕様は「空行...は妥当ではありません」とあります。
	// 再確認: 「空行、および数字とカンマ以外を含む行は妥当ではありません。」
	// よって空行は不可。末尾カンマのみでも可か？「1 個以上の数字列がカンマで区切られて並んでいることです。」
	// 例: "1" -> OK, "1," -> OK (末尾カンマ許容), "1,2" -> OK.
	// 空行は NG。
	// 正規表現: ^[\s]*\d+(?:,\d+)*(?:,\s*)?$ を考えるが、前後の空白は無視する必要がある。
	// 実際の実装としては、trim をしてから判定し、または Regex に \s を含める。
	// 仕様: 「行の前後の空白は無視します。」 -> 前後の空白は OK.
	// 内容内部の空白? "1, 2" は NG (数字とカンマ以外). "\d+" とカンマのみが OK.

	re := regexp.MustCompile(`^\s*\d+(?:,\d+)*(?:,\s*)?$`)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		// 改行文字が含まれている場合、末尾から切り取り、空白を処理
		trimmed := line[:len(line)-1]
		trimmed = trimmed // ここでは TrimSpace を用いるか、Regex に含めるか。
		
		// 正規表現でチェック (前後空白含む)
		// 数値とカンマのみが OK. 空行 NG.
		// 正規表現: ^[\s]*(\d+(?:,\d+)*(?:,\s*)?)$ 
		// ただし "1," が OK なので、末尾の空白も許容。
		// "1" -> OK, "1," -> OK, " 1," -> OK.
		// "1,2" -> OK.
		
		if re.MatchString(trimmed) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
