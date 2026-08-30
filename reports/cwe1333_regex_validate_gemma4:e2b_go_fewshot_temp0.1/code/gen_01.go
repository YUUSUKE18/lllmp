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

		// 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当か判定する
		// 1. カンマで分割する
		parts := strings.Split(line, ",")

		// 2. 少なくとも1つの要素があるか確認する (末尾のカンマのみの場合は、空文字列が1つ以上になる可能性があるため、要素の数をチェックする)
		// 例: "1,2," -> ["1", "2", ""] (長さ3)
		// 例: "1," -> ["1", ""] (長さ2)
		// 例: "," -> ["", ""] (長さ2)

		// 妥当な行は、カンマで区切られた要素が1つ以上存在し、かつ、その要素がすべて整数である必要がある。
		// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当の定義。
		// 「数字列」が整数であるかどうかのチェックは、ここでは「数字列」として扱われることを前提とする。
		// 空でない要素が1つ以上あれば、それは「1 個以上の数字列」と見なせる。

		hasValidNumber := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列であるかチェック
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err == nil {
					hasValidNumber = true
				} else {
					// 数字以外の文字が含まれている場合は妥当ではない
					hasValidNumber = false
					break
				}
			}
		}

		// 末尾のカンマが許容されるため、要素が空文字列で構成されていても、
		// 少なくとも1つの非空の数字列が存在すれば妥当とする。
		// ただし、仕様の「空行、および数字とカンマ以外を含む行は妥当ではありません」を厳密に解釈する。
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで区切られた要素のうち、少なくとも1つが有効な整数を表していることを意味する。

		if hasValidNumber {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
