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

		// 末尾のカンマを許容しつつ、数字とカンマのみで構成されているかチェックする
		// 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
		// これは、カンマで区切られた要素がすべて整数である、という条件を満たせば良い。
		// 課題の記述を厳密に解釈すると、「1個以上の数字列がカンマで区切られて並んでいる」ことを意味する。
		// 例: "1,2,3" -> 3つの数字列
		// 例: "1,2," -> 2つの数字列 (末尾のカンマは許容)
		// 例: "abc,1" -> 不妥当 (数字とカンマ以外を含む)

		// 行をカンマで分割する
		parts := strings.Split(line, ",")

		if len(parts) == 0 {
			// これは空行で既に除外されているはずだが念のため
			continue
		}

		isValid := true
		for _, part := range parts {
			// 各部分が空でないか、または数字のみで構成されているかを確認する
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				// カンマが連続している場合や、末尾のカンマが原因で空文字列になる場合を考慮する。
				// 例: "1,,2" -> parts=["1", "", "2"]
				// 課題の「1個以上の数字列がカンマで区切られて並んでいる」を満たすためには、
				// 空の要素が許容されるかどうかが重要。
				// 「空でない語の数」を数えるのではなく、「数字列」を数える。
				// 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
				// これは、少なくとも1つの数字列が存在すれば良い、と解釈する。
				// ただし、「数字とカンマ以外を含む行は妥当ではない」という制約があるため、
				// 各要素が数字のみで構成されていることを確認する。
				// 末尾のカンマは許容されるため、最後の要素が空でも良い。
				continue
			}

			// 部分がすべて数字のみで構成されているかチェック
			if _, err := fmt.Sscan(trimmedPart); err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validLines++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、ここでは無視）
	}

	fmt.Printf("valid=%d\n", validLines)
}
