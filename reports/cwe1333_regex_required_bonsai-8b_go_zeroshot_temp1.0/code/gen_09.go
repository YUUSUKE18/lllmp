package main

import (
	"fmt"
	"strings"
)

func main() {
	// レイテンスを検出
	var lineCount = 0
	for {
		line, err := fmt.Scanln(os.Stdin)
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		lineCount++
	}

	// レイヤーを分割して検証
	lines := strings.Split(lineCount, "\n")
	for _, line := range lines {
		// 行の前後の空白を無視
		line = strings.TrimSpace(line)
		// カンマ区切りの整数列を正規表現で検証
		if !regexp.MustCompile(`^\d+(?:,\d+)*$`).MatchString(line) {
			fmt.Println("valid=0")
			return
		}
		// カンマ区切りの整数列が少なくとも1個ある場合、許容
		if len(regexp.MustCompile(`^\d+(?:,\d+)*$`).FindAllString(line, -1)) > 0 {
			fmt.Println("valid=1")
		}
	}

	// すべての行が妥当でなければ、1行だけの valid=0 を出力
	fmt.Println("valid=0")
}
