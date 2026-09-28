package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない（仕様により、1個以上の数字列がカンマで区切られていなければならない）
			continue
		}

		// 末尾のカンマを取り除いて、カンマ区切りの整数列が存在するかチェックする
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// 行がカンマのみ、またはカンマで終わる（例: "," または "1,"）場合、
			// 1個以上の数字列が区切られていないため不妥当と判断する
			continue
		}

		// カンマで分割して、空でない数字列が存在するか確認する
		parts := strings.Split(line, ",")
		isValid := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列が存在すればOK
				isValid = true
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
