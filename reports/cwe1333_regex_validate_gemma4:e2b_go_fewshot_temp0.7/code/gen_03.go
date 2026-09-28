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

		// 末尾のカンマを無視して、カンマ区切りの整数列として妥当かを判定する
		// 妥当な行は、カンマで区切られた数字列が存在する場合。
		// 末尾のカンマは許容される。
		
		// 行をカンマで分割し、各要素が数字のみで構成されているか、または空でないかを確認する
		parts := strings.Split(line, ",")
		
		isValid := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 各部分が整数であるかチェックする
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err == nil {
					// 少なくとも1つの有効な数字列が存在すれば妥当
					isValid = true
					break
				}
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
