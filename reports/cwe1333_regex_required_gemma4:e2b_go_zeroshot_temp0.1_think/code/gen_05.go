package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	// 正規表現パターン:
	// ^[\d,]+$
	// これは、行全体が1文字以上の数字(\d)またはカンマ(,)のみで構成されていることを要求します。
	// これにより、空行や数字とカンマ以外の文字を含む行が除外されます。
	// また、少なくとも1つの数字が含まれていることを保証します。
	pattern := regexp.MustCompile(`^[\d,]+$`)

	validCount := 0

	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		
		// 行の前後の空白を無視する (仕様に基づき、ここでは行全体をチェックする)
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 正規表現で妥当性を判定
		if pattern.MatchString(trimmedLine) {
			validCount++
		}
	}

	// 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
