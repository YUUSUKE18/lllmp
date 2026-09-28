package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	parts := strings.Split(s, ",")
	for _, p := range parts {
		if p != "" && !strings.HasPrefix(p, "-") && !strings.HasSuffix(p, "0") { // 簡易的なチェック: 数字のみか確認
			// より厳密に: 文字列が整数を表すか確認
			// Go の strconv.Atoi は空白を許容しないので、まず空白がないか確認
			if strings.ContainsAny(p, ",") || strings.ContainsAny(p, " ") {
				return false
			}
			// 数字のみかチェック (正負の符号付き)
			for _, c := range p {
				if c < '0' || c > '9' && c != '-' && c != '+' {
					return false
				}
			}
		}
	}
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if isValidLine(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
