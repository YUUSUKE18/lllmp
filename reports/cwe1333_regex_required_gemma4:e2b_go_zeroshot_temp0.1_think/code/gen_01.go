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
	// ^[\d,]*  -> 行の先頭から、数字またはカンマが0回以上続く
	// \d      -> 少なくとも1つの数字が存在すること
	// [\d,]*$ -> その後、数字またはカンマが0回以上続く
	// これにより、行が空ではなく、数字とカンマのみで構成されていることを確認する。
	// ただし、このパターンだけでは「1個以上の数字列がカンマで区切られている」という構造を完全に保証しないため、
	// 構造チェックと内容チェックを組み合わせる。
	// 構造チェック: 数字とカンマのみで構成され、かつ数字が少なくとも1つ含まれていること。
	pattern := regexp.MustCompile(`^[\d,]*\d[\d,]*$`)

	validCount := 0

	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		
		// 行の前後の空白を無視する (ただし、正規表現の適用前にトリミングを行う)
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
