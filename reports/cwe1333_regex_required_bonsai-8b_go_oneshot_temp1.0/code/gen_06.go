package main

import (
	"regexp"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines []string

	for {
		sc.Scan()
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			break
		}
		// パンデントと空格は無視
		// 正規表現: [0-9]+ (, [0-9]+)* （1以上）
		// カンマで区切られた数字のみの行
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}

	fmt.Printf("valid=%d\n", len(validLines))
}
