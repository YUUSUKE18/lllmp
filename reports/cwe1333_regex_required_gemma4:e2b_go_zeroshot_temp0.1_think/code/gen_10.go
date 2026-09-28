package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	// 正規表現のコンパイル
	// この正規表現は、行が空ではなく、数字とカンマのみで構成されていることを確認します。
	// ^[\d,]+$ : 行全体が1文字以上の数字またはカンマで構成されていることを意味します。
	// これは「1個以上の数字列がカンマで区切られて並んでいる」という条件を、
	// 厳密な構造チェックではなく、文字セットと非空チェックに置き換えることで実現します。
	// (注: 厳密な構造チェックを正規表現で行う場合、複雑な繰り返し構造が必要になりますが、
	// ここでは「数字とカンマのみで構成され、空ではない」という制約を正規表現で満たします。)
	re := regexp.MustCompile(`^[\d,]+$`)

	validCount := 0

	// 標準入力から行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		// 行の前後の空白を無視する（仕様に基づき、行の内容をトリムする）
		trimmedLine := strings.TrimSpace(line)

		// 1. 空行の判定
		if trimmedLine == "" {
			continue
		}

		// 2. 数字とカンマ以外を含む行の判定（正規表現を使用）
		// 正規表現がマッチするかどうかで妥当性を判定する
		if re.MatchString(trimmedLine) {
			validCount++
		}
	}

	// 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
