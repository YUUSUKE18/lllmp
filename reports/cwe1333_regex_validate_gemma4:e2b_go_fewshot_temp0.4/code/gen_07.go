package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去して、カンマで区切られた数値列が存在するか確認する
		// 末尾のカンマは許容されるため、行全体がカンマと数字のみで構成されているかを確認する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行（既にチェック済みだが念のため）
			continue
		}

		// カンマで分割し、空でない要素が存在するか確認する
		parts := strings.Split(line, ",")
		hasNumbers := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列が存在すれば妥当
				hasNumbers = true
			}
		}

		if hasNumbers {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
