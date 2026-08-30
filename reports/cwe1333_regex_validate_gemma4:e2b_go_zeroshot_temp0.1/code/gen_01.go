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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、TrimSpaceで前後の空白を除去）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容する
		// 妥当であるためには、少なくとも1個の数字列がカンマで区切られている必要がある。
		// これは、カンマで分割した結果、少なくとも1つの非空の要素が存在すれば良い、ということを意味する。

		// 末尾のカンマを削除して処理を簡略化する
		processedLine := trimmedLine
		if strings.HasSuffix(processedLine, ",") {
			processedLine = processedLine[:len(processedLine)-1]
		}

		// カンマで分割する
		parts := strings.Split(processedLine, ",")

		// 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
		// これは、分割された要素の数が1以上であること、かつ、その要素がすべて数字列であること、という条件を満たす必要がある。
		// 仕様によれば、「1 個以上の数字列がカンマで区切られて並んでいること」が妥当である。
		// 空行は除外されているため、もし分割結果が空でないなら、それは数字列の集合を表している。

		isValid := false
		for _, part := range parts {
			// 各部分が空でなく、かつ数字列であることを確認する
			if part != "" {
				// 数字列であるかどうかのチェック（ここでは、文字列が数字のみで構成されているかを確認する）
				// 仕様では「カンマ区切りの整数列」なので、各要素が整数である必要がある。
				// 厳密に「数字列」であるかを確認する。
				if _, err := fmt.Sscan(part); err == nil {
					// Sscanが成功すれば、その文字列は整数として解釈可能（数字列である）
					isValid = true
					break
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

	// 結果の出力
	fmt.Printf("valid=%d\n", validCount)
}
