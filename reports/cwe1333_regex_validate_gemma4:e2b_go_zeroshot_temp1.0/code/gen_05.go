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
		// 行の前後の空白を無視する
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容する
		// 末尾のカンマを取り除いた文字列に対して、カンマ区切りの整数列であるかを確認する
		
		// 末尾のカンマを取り除く（任意）
		content := trimmedLine
		if strings.HasSuffix(content, ",") {
			content = content[:len(content)-1]
		}

		// カンマで分割する
		parts := strings.Split(content, ",")

		// 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。
		// 空の要素（連続するカンマや先頭・末尾のカンマによって生じる空文字列）を除外する必要がある。
		
		// 空文字列を除いた要素の数を数える
		count := 0
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				count++
			}
		}

		// 1個以上の数字列が存在すれば妥当
		if count >= 1 {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理は仕様に明記されていないが、通常は無視するかエラーを出す
	}

	fmt.Printf("valid=%d\n", validCount)
}
