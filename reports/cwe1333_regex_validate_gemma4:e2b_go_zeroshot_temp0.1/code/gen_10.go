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
		// これは、分割された要素の数が1以上であり、かつその要素がすべて数字列（または空文字列だが、ここでは数字列として扱う）である必要がある。
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
		// 空行は除外済み。数字とカンマ以外を含む行は除外。

		isValid := false
		if len(parts) > 0 {
			// 各部分が数字列であるかを確認する
			allPartsAreDigits := true
			for _, part := range parts {
				if part == "" {
					// カンマが連続している場合（例: "1,,2"）や、末尾のカンマ処理で生じた空文字列
					// 仕様では「1 個以上の数字列」が区切られている必要があるため、空文字列は許容されないと解釈する。
					// ただし、末尾のカンマは許容されるため、"1," の場合 parts=["1"] となり OK。
					// "1,,2" の場合 parts=["1", "", "2"]。空文字列は数字列ではないため、これは妥当ではないと判断すべきか？
					// 「数字列」が区切られている、という表現から、区切り文字で区切られた要素がすべて数字列である、と解釈するのが最も安全。
					// 空文字列は数字列ではないため、ここでは妥当ではないとする。
					allPartsAreDigits = false
					break
				}
				// partが数字列であるかチェック
				if _, err := fmt.Sscan(part); err != nil {
					// 数字列でない場合（数字とカンマ以外を含む場合）
					allPartsAreDigits = false
					break
				}
			}

			if allPartsAreDigits {
				// 少なくとも1つの要素が存在すれば妥当
				isValid = true
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
