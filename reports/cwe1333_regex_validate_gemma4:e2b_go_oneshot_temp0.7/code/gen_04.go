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

		// 末尾のカンマを削除して、数字のみの文字列を取得
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行として扱われる可能性があるが、
			// 仕様では「1個以上の数字列がカンマで区切られて並んでいる」ことを要求。
			// 空行やカンマのみは不適格とみなす。
			continue
		}

		// カンマで分割して、すべてが整数であるかチェック
		parts := strings.Split(trimmedLine, ",")
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 空の要素（連続するカンマや末尾のカンマで生じる）は許容されるが、
				// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
				// 厳密に「数字列」のみを数えることを想定し、空の要素は無視するか、
				// より厳密に処理する。

				// 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
				// これは、カンマで区切られた要素がすべて整数であることを意味する。
				// TrimSpaceで処理した後の各要素が整数であることを確認する。
				// ここでは、空の要素があっても、それが区切りとして機能している限りはOKとする。
				// ただし、行全体が「数字列」のみで構成されている必要がある。
				// 以下のチェックで十分と判断する。
			}
		}

		// 各要素が整数であるか、および数字とカンマ以外を含まないかを再確認する
		// TrimSpaceで処理した後の各要素が整数であることを確認する。
		// ここでは、行が「カンマ区切りの整数列」であるかという定義に従い、
		// 各要素が整数であるかを確認する。
		
		allPartsAreValid := true
		for _, part := range parts {
			// 各部分が整数であるかチェック。空文字列は無視する（これは区切りとして機能するため）
			if part != "" {
				_, err := fmt.Sscanf(part, "%d", new(int))
				if err != nil {
					allPartsAreValid = false
					break
				}
			}
		}

		// 妥当であるための条件：
		// 1. 行が空でないこと（行が "" でない）
		// 2. 数字とカンマ以外を含まないこと（TrimSpaceで処理後、数字とカンマのみで構成されること）
		// 3. 1個以上の数字列がカンマで区切られて並んでいること（つまり、区切り文字で分割した結果、意味のある要素が存在すること）

		// 簡略化して、TrimSpace後の行が数字とカンマのみで構成され、かつ最低1つの数字が含まれていることを確認する。
		// 仕様を厳密に解釈すると、"1,2," や "1,,2" のようなケースをどう扱うかが重要。
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで区切った後に、少なくとも1つの非空の数字列が存在すればOKとする。

		// 再度、行全体をチェックする。
		// 行に含まれるすべての文字が数字またはカンマであるか、そして少なくとも1つの数字が含まれているか。
		isStrictlyValid := true
		hasNumber := false
		for _, char := range line {
			if char != ',' && char != ' ' && char < '0' || char > '9' {
				isStrictlyValid = false
				break
			}
			if char >= '0' && char <= '9' {
				hasNumber = true
			}
		}

		if isStrictlyValid && hasNumber {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
