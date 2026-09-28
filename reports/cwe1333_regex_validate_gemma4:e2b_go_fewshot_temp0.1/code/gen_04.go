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

		// 末尾のカンマを許容しつつ、数字とカンマ以外を含まないかチェックする
		// 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
		// これは、カンマで区切られた要素がすべて整数であることを意味する。
		// 末尾のカンマは許容される。

		// 行をカンマで分割する
		parts := strings.Split(line, ",")

		if len(parts) == 0 {
			// これは空行で既に除外されているはずだが念のため
			continue
		}

		isValid := true
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				// カンマが連続している場合（例: "1,,2" や ",1" など）
				// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
				// 空の要素が連続することは、区切られた要素が「数字列」ではないことを意味する。
				// 例: "1,,2" -> ["1", "", "2"]。空の要素があるため、これは妥当ではないと解釈する。
				// ただし、末尾のカンマは許容される。
				// 厳密に「数字列」のみを許容する場合、空の要素は許容されない。
				// 課題の文脈から、各要素が数字列である必要があると解釈する。
				isValid = false
				break
			}

			// 各部分が整数であるかチェック
			_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
			if err != nil {
				// 数字とカンマ以外を含む、または数字でない場合は妥当ではない
				isValid = false
				break
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
