package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	// 正規表現コンパイル
	// このパターンは、行が数字とカンマのみで構成されていることを確認します。
	// ^[\d,]*$ : 行が数字(\d)とカンマ(,)のみで構成され、空文字列を含むことを許可する。
	validCharRegex := regexp.MustCompile(`^[\d,]*$`)

	validCount := 0

	// 標準入力から行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()

		// 行の前後の空白を無視する
		trimmedLine := strings.TrimSpace(line)

		// 1. 空行の判定
		if trimmedLine == "" {
			continue
		}

		// 2. 正規表現による妥当性の判定
		// 行が数字とカンマのみで構成されているかを確認
		if !validCharRegex.MatchString(trimmedLine) {
			// 数字とカンマ以外の文字が含まれている場合は無効
			continue
		}

		// 3. 1個以上の数字列が存在するかを確認
		// 妥当であるためには、少なくとも1つの数字が含まれている必要がある。
		hasDigit := false
		for _, char := range trimmedLine {
			if char >= '0' && char <= '9' {
				hasDigit = true
				break
			}
		}

		if hasDigit {
			validCount++
		}
	}

	// 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
