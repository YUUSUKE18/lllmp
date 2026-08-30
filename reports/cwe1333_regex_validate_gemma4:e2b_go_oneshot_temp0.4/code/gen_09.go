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

		// 末尾のカンマを削除して、数字とカンマのみで構成されているかチェック
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行として扱われる（ただし、空行は既に除外済み）
			// 厳密には、数字列が1個以上必要なので、ここでは妥当ではないと判断する
			continue
		}

		// trimmedLineが数字のみで構成されているか、または数字とカンマで区切られているかを確認する
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで区切られた要素がすべて整数である、ということを意味する。
		// 妥当な形式は「数字,数字,...」または「数字,」など。
		
		parts := strings.Split(line, ",")
		
		// 1個以上の要素が存在し、かつ、各要素が空でないことを確認する
		// 末尾のカンマは許容されるため、Splitの結果をそのまま評価する。
		// 例: "1,2," -> ["1", "2", ""]
		// 例: "1," -> ["1", ""]
		
		// 妥当な行の判定基準を再確認:
		// 1. 1個以上の数字列がカンマで区切られて並んでいる。
		// 2. 空行は妥当ではない。
		// 3. 数字とカンマ以外を含む行は妥当ではない。

		// 1. 数字とカンマ以外を含む行のチェック:
		// lineに含まれる文字が数字、カンマ、空白のみで構成されているか？
		isValidChars := true
		for _, char := range line {
			if !('0' <= char && char <= '9' || char == ',' || char == ' ') {
				isValidChars = false
				break
			}
		}
		if !isValidChars {
			continue // 数字とカンマ以外を含む行は妥当ではない
		}

		// 2. 1個以上の数字列がカンマで区切られているか？
		// これは、カンマで分割した結果、少なくとも1つの要素が数字（または空文字列だが、末尾のカンマで生じる空文字列は許容される）である必要がある。
		// 少なくとも1つの要素が存在すれば、それは区切られた列が存在することを意味する。
		if len(parts) > 0 {
			// 末尾のカンマが許容されるため、"1," -> ["1", ""] は妥当。
			// "" は既に除外済み。
			// したがって、partsが空でない限り、それは妥当である。
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
