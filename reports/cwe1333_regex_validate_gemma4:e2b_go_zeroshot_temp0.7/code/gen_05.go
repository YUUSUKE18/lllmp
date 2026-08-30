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
		line := scanner.Text()
		// 行の前後の空白を無視する
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容するが、それ以外は厳密にカンマ区切りの整数列である必要がある
		// 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。
		// これは、カンマで分割した結果、空でない要素が1つ以上存在すること、
		// かつ、その要素がすべて整数であること、という条件を満たす必要がある。

		// 1. 末尾のカンマを削除して、カンマで分割してみる
		processedLine := trimmedLine
		if strings.HasSuffix(processedLine, ",") {
			processedLine = processedLine[:len(processedLine)-1]
		}

		// 2. カンマで分割する
		parts := strings.Split(processedLine, ",")

		// 3. 妥当性の判定
		// 妥当であるためには、分割された部分が空でない整数列で構成されている必要がある。
		// 1個以上の数字列がカンマで区切られて並んでいること。
		// これは、分割された部分が1つ以上存在し、そのうち少なくとも1つは数字列である必要がある。
		// 仕様の解釈に基づくと、「カンマで区切られた要素がすべて整数であること」が暗黙的に要求されますが、
		// 「1 個以上の数字列がカンマで区切られて並んでいる」という表現を最も直接的に満たすのは、
		// 少なくとも1つの要素が存在し、それが数字列であることです。

		isValid := false
		if len(parts) > 0 {
			// 少なくとも1つの要素が存在する
			// 各要素が空でないことを確認し、それが数字列であることを確認する
			for _, part := range parts {
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart != "" {
					// 各部分が整数であるかチェック
					_, err := fmt.Sscanf(trimmedPart, "%d", &int(0)) // 整数としてパースを試みる
					if err == nil {
						// 整数としてパースできた。
						// この行は「1個以上の数字列がカンマで区切られて並んでいる」条件を満たしている。
						isValid = true
						break
					}
				}
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
