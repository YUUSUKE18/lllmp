package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	// 正規表現パターン:
	// ^\s*          -> 行の先頭の任意の空白文字
	// (?:          -> 非キャプチャグループの開始 (数字とカンマのパターン)
	//   \d+        -> 1つ以上の数字
	//   (?:,\d+)*  -> カンマと1つ以上の数字が0回以上続く (カンマ区切りの整数列)
	// )            -> グループの終わり
	// \s*$          -> 行末の任意の空白文字
	// このパターンは、カンマ区切りの整数列が1つ以上存在することをチェックします。
	// 末尾のカンマは許容されます。
	pattern := regexp.MustCompile(`^\s*(?:\d+(?:,\d+)*)\s*$`)

	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 正規表現で判定
		if pattern.MatchString(line) {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
