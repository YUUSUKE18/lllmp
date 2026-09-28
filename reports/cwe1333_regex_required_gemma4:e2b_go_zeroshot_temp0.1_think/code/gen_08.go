package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	// 正規表現パターンを定義します。
	// パターン: ^\d+(?:,\d+)*,?$
	// これは、以下の条件を満たす行を妥当と判定します:
	// 1. 行は数字とカンマのみで構成されていること。
	// 2. 1個以上の数字列がカンマで区切られていること。
	// 3. 末尾にカンマがあっても許容されること。
	pattern := regexp.MustCompile(`^\d+(?:,\d+)*,?$`)

	validCount := 0

	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()

		// 行の前後の空白を無視するため、行全体をトリムします。
		// ただし、行が完全に空白だった場合も処理します。
		trimmedLine := ""
		for i := 0; i < len(line); i++ {
			if line[i] != ' ' && line[i] != '\t' && line[i] != '\n' && line[i] != '\r' {
				trimmedLine += string(line[i])
			}
		}

		// 空行は妥当ではないためスキップ
		if trimmedLine == "" {
			continue
		}

		// 正規表現を用いて妥当性を判定
		if pattern.MatchString(trimmedLine) {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	// 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
