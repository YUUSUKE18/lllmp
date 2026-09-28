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
			continue
		}

		// 末尾のカンマを許容するため、カンマで分割する前に処理する
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
		// これは、カンマで分割した結果、空でない要素が1つ以上存在することと同義。
		// 末尾のカンマは許容されるため、末尾のカンマがあっても、それ以前の数字列が1つ以上あればOK。

		// 行全体をカンマで分割する
		parts := strings.Split(line, ",")

		// 末尾のカンマの有無を考慮し、数字列のみをチェックする
		// 例えば "1,2," の場合、parts は ["1", "2", ""] となる。
		// 妥当であるためには、少なくとも1つの数字列が存在する必要がある。

		hasDigits := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列であるかチェック（ここでは、数字のみで構成されていることを前提とする）
				// 仕様では「数字列」が区切られていることを求めているため、
				// 各部分が数字のみで構成されているかを確認する。
				// ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいる」であり、
				// 「数字とカンマ以外を含む行は妥当ではない」という制約もある。

				// ここでは、各部分が数字のみで構成されているかを確認する。
				if _, err := fmt.Sscan(trimmedPart); err == nil {
					hasDigits = true
				} else {
					// 数字以外の文字が含まれていれば、その行は妥当ではない
					hasDigits = false // 誤った文字が含まれている場合は、この行全体が妥当ではない
					break
				}
			}
		}

		// 妥当性の判定ロジックを再検討する。
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// 「末尾のカンマは許容する」
		// 「空行、および数字とカンマ以外を含む行は妥当ではない」

		// 1. 空行はスキップ済み。
		// 2. 数字とカンマ以外を含む行は、strings.Splitの結果が意図しないものになるか、
		//    Sscanでエラーになる。

		// 妥当な行は、カンマで区切られた要素の中に、少なくとも1つ以上の数字が含まれていること。
		// もし行が "1,2" なら parts=["1", "2"]。hasDigits=true。
		// もし行が "1," なら parts=["1", ""]。hasDigits=true。
		// もし行が "," なら parts=["", ""]。hasDigits=false。
		// もし行が "abc" なら parts=["abc"]。Sscanでエラーになるため、hasDigits=false。

		// 最終的な判定: parts の中で、空でない要素が存在し、かつそれらがすべて数字のみで構成されているか。
		// または、より単純に、カンマで区切られた結果、少なくとも1つの数字列が存在するか。

		isLineValid := false
		if len(parts) > 0 {
			for _, part := range parts {
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart != "" {
					// 数字のみで構成されているか確認
					if _, err := fmt.Sscan(trimmedPart); err == nil {
						isLineValid = true
						break // 1つでも数字列があればOK
					} else {
						// 数字以外の文字が含まれている場合、この行は無効
						isLineValid = false
						break
					}
				}
			}
		}

		if isLineValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、通常はログ出力などを行う
	}

	fmt.Printf("valid=%d\n", validCount)
}
