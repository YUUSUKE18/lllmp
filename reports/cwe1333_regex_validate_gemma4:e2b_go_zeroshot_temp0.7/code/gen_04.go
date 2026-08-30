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
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを削除してチェックする
		// 末尾のカンマは許容されるが、数字とカンマ以外を含む行は妥当ではない。
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた後に、数字のみが続く、またはカンマで区切られている場合に成立する。

		// 行全体が「カンマ区切りの整数列」であるかを確認する
		// 妥当な条件: 1個以上の数字列がカンマで区切られていること。
		// これは、行がカンマで区切られたときに、要素が全て整数である必要がある。

		// 1. 末尾のカンマを削除して、カンマで分割してみる
		// 例: "1,2,3," -> ["1", "2", "3", ""]
		// 例: "1,2,a" -> ["1", "2", "a"]

		// 行全体をカンマで分割する
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定ロジック:
		// 1. 空行は除外済み。
		// 2. 数字とカンマ以外を含む行は妥当ではない。
		// 3. 1個以上の数字列がカンマで区切られて並んでいること。

		// 妥当な行とは、カンマで区切られた要素が全て整数であり、少なくとも1つ存在する行である。

		isValid := false
		if len(parts) > 0 {
			// 各部分が空でないか、そして整数であるかをチェックする
			// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
			// これは、カンマで区切られた要素が全て数字（または空文字列）で構成されている場合に成立する。

			// ここでは、各部分が「整数列」であるかを確認する。
			// 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
			// これは、分割された要素がすべて整数である場合に満たされると解釈する。

			allAreIntegers := true
			for _, part := range parts {
				// partが空文字列の場合、それは末尾のカンマによる空要素（例: "1,2," -> ["1", "2", ""]）に対応する。
				// 空文字列は数字列ではないが、末尾のカンマは許容されるため、空要素は許容する。
				if part != "" {
					_, err := fmt.Sscanf(part, "%d", new(int))
					if err != nil {
						// 数字とカンマ以外を含む行、または非整数が含まれる場合
						allAreIntegers = false
						break
					}
				}
			}

			if allAreIntegers {
				// 少なくとも1つの要素が存在すれば妥当
				if len(parts) >= 1 {
					isValid = true
				}
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
