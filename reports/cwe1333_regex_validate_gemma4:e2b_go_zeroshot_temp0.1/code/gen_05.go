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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、トリムは不要だが、念のため）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容する
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素が存在し、それが数字列である必要がある。
		// 少なくとも1つのカンマが存在するか、または数字列のみが存在するケースを考慮する必要がある。

		// 仕様の解釈: 「1 個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素が存在し、それらがすべて数字列である、ということを意味する。
		// 末尾のカンマは許容される。

		// 1. 末尾のカンマを取り除く（もしあれば）
		processedLine := trimmedLine
		if strings.HasSuffix(processedLine, ",") {
			processedLine = processedLine[:len(processedLine)-1]
		}

		// 2. カンマで分割する
		parts := strings.Split(processedLine, ",")

		// 3. 妥当性の判定
		// 妥当であるためには、分割された要素がすべて空文字列でなく、かつ数字列である必要がある。
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
		// これは、分割された要素の数が1以上であり、かつそれらがすべて数字列である必要がある。

		isValid := false
		if len(parts) > 0 {
			// 少なくとも1つの要素がある
			allAreDigits := true
			for _, part := range parts {
				// 空文字列でないこと、そして数字列であること
				if part == "" {
					// カンマが連続している場合（例: "1,,2"）や、行がカンマのみの場合を考慮
					// 仕様では「数字列がカンマで区切られて並んでいる」ため、空要素は許容されないと解釈する。
					allAreDigits = false
					break
				}
				// partが完全に数字列であるかチェック
				if _, err := fmt.Sscan(part); err != nil {
					allAreDigits = false
					break
				}
			}

			if allAreDigits {
				// 1個以上の数字列が区切られている
				isValid = true
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
