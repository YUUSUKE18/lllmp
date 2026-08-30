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
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみの行（例: "," や ",,"）は妥当ではない（1個以上の数字列が必要）
			continue
		}

		// カンマで分割して、各要素が整数であることを確認する
		parts := strings.Split(trimmedLine, ",")

		if len(parts) == 0 {
			// これはtrimmedLineが空でないのに分割が0になることは通常ないが、念のため
			continue
		}

		isValid := true
		for _, part := range parts {
			// 各部分が空でないことを確認し、整数に変換できるか確認する
			if part == "" {
				// カンマが連続している場合 (例: "1,,2") は、元の仕様の「1個以上の数字列がカンマで区切られて並んでいる」を満たさない可能性があるため、
				// ここでは、カンマで区切られた要素がすべて非空であることを要求する。
				// ただし、元の行が「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすかどうかが重要。
				// 末尾のカンマは許容されるが、内部の連続するカンマは許容されないと解釈する。
				isValid = false
				break
			}
			// 整数であるかチェック（Atoiでエラーが発生するかどうかは、元の行に数字以外の文字が含まれている場合に検出される）
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err != nil {
				// 数字とカンマ以外を含む場合、または数値としてパースできない場合
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
