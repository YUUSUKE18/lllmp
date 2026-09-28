package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// 標準入を読み取る
	for {
		var line []string
		_, err := fmt.Scan(os.Stdin, strings.NewReader(line))
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Println("Invalid input")
			return
		}

		// 空行や空格を無視
		trimmedLine := strings.Join(line, "").Trim()

		// カンマ区切りの整数列として検証
		if !regexp.MustCompile(`^\d+($|\d+,$|$|$)`).MatchString(trimmedLine) {
			continue
		}

		// パラグラムの条件に合った場合、追加
		if len(trimmedLine) > 0 {
			validLines = append(validLines, trimmedLine)
		}
	}

	// 最終出力
	fmt.Printf("valid=%d\n", len(validLines))
}
