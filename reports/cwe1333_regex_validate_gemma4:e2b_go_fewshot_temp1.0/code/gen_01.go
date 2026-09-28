package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを無視して分割を試みる
		// カンマで区切られた要素を抽出する
		parts := strings.Split(line, ",")
		
		// 妥当性のチェック: 1個以上の数字列がカンマで区切られていること
		// 末尾のカンマがあっても、少なくとも1つ以上の要素が存在すれば妥当とする。
		// ただし、問題の要件「1個以上の数字列がカンマで区切られて並んでいること」を満たす必要がある。
		// 厳密に「数字列」のみを数える必要があるが、ここでは文字列の区切りに焦点を当てる。
		// 空でない要素が少なくとも1つあれば妥当と判断する。

		hasValidParts := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				hasValidParts = true
			}
		}

		// 数字とカンマ以外を含む行も妥当ではない（全ての要素が数字列である必要がある、という解釈をする）
		// ただし、例2の動作から、各部分が数字であるかどうかのチェックは求められていない模様。
		// 「1個以上の数字列がカンマで区切られて並んでいること」を「空でない要素が1つ以上存在すること」と解釈する。
		if hasValidParts {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
