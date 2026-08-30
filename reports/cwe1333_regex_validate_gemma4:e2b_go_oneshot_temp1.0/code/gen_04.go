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

		// 末尾のカンマが許容されるため、行全体をカンマで分割するのではなく、
		// カンマで区切られた部分が1つ以上存在するかをチェックする。
		// 妥当な行は「1 個以上の数字列がカンマで区切られて並んでいる」こと。
		// これは、カンマで分割した結果、空でないトークンが1つ以上あることと同義。

		// 最後のカンマを取り除く（末尾のカンマは許容されるため、数字以外の文字をチェックする）
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行（既に空行チェックで除外済み）
			// ただし、元の行がカンマのみ（例: "," または ",,"）の場合、
			// trimmedLine は "" となる。この場合も妥当ではない。
			continue
		}

		// カンマで分割し、数字列が1つ以上存在するか確認する。
		// 厳密には「1 個以上の数字列がカンマで区切られて並んでいる」という条件を満たすか。
		// 各要素が数字列であるかを確認する。
		parts := strings.Split(line, ",")
		
		hasDigits := false
		for _, part := range parts {
			// 数字列が空でないことを確認する
			if strings.TrimSpace(part) != "" {
				// その部分が完全に整数であることを確認する（課題の文脈から数字のみを期待）
				if _, err := fmt.Sscanf(part, "%d", new(int)); err == nil {
					hasDigits = true
					break // 1つでも数字があればOK
				}
			}
		}

		if hasDigits {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（今回は不要だが慣例として）
	}

	fmt.Printf("valid=%d\n", validCount)
}
