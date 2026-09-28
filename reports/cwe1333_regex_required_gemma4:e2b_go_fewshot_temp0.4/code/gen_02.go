package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	// 正規表現: カンマ区切りの整数列をチェックする。
	// ^\s* - 行の先頭の空白を無視
	// (?:[0-9]+(?:,\s*[0-9]+)*) - 1つ以上の数字とカンマ区切りのパターンをキャプチャ
	// (?:,?\s*)$ - 末尾のカンマや空白を許容
	// この正規表現は「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
	// 厳密に「1個以上の数字列」が区切られていることを確認するため、
	// 少なくとも一つの数字列が存在することを保証する。
	// 実際には、行が空でないこと、数字とカンマ以外を含まないことを別途チェックする。

	// 妥当性の判定ロジックを実装する
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 1. 数字とカンマ以外が含まれていないかチェック
		// 許容される文字は数字(0-9)、カンマ(,)、空白( )のみ
		if !regexp.MustCompile(`^[0-9, \t\r\n]*$`).MatchString(line) {
			continue // 数字とカンマ以外を含む行は妥当ではない
		}

		// 2. カンマ区切りの整数列が1個以上存在するかチェック
		// 末尾のカンマは許容するが、カンマで区切られた要素が1つ以上ある必要がある。
		// 例: "1,2,3" -> 3要素
		// 例: "1," -> 2要素 (1と空の要素) または 1要素 (1) の解釈が必要。
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで区切られた要素の数が1以上であることを意味する。

		// カンマで分割し、各要素が数字のみで構成されているかを確認する
		parts := strings.Split(line, ",")
		
		// 妥当な要素が1つ以上存在するか確認
		// 末尾のカンマがあっても、Splitの結果には空文字列が含まれる可能性がある。
		// 例: "1,2," -> ["1", "2", ""] (長さ3)
		// 例: "1," -> ["1", ""] (長さ2)
		
		// 妥当な数字列の数を数える
		count := 0
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字のみで構成されているかチェック
				if regexp.MustCompile(`^[0-9]+$`).MatchString(trimmedPart) {
					count++
				} else {
					// 数字以外のものが含まれている場合は妥当ではない
					goto nextLine
				}
			}
		}

		if count >= 1 {
			validLines++
		}

	nextLine:
	}

	fmt.Printf("valid=%d\n", validLines)
}
