package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// レイクスサーで行を読み込む
	scanner := strings.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// カンマ区切りの整数列を正規表現で検証
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}

	// 最後に1行だけを出力
	fmt.Printf("valid=%d\n", len(validLines))
}
