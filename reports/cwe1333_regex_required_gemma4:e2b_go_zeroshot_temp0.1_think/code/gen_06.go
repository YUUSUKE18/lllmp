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
	// このパターンは、行が数字(\d)とカンマ(,)のみで構成されていることを確認します。
	// 1個以上の数字列がカンマで区切られている構造を許容します。
	// ^[\d,]+$ : 行全体が1文字以上の数字またはカンマで構成されていることを要求します。
	// これは、空行や数字とカンマ以外の文字を含む行を排除し、
	// 少なくとも1つの数字が含まれていることを保証します。
	re := regexp.MustCompile(`^[\d,]+$`)

	validCount := 0

	// 標準入力から行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()

		// 行の前後の空白を無視する (仕様に従い、ここでは行全体をチェックする)
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 正規表現で妥当性を判定
		if re.MatchString(trimmedLine) {
			validCount++
		}
	}

	// 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
