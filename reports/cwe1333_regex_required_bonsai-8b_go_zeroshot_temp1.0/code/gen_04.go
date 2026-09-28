package main

import (
	"fmt"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,,4")
	validLines := []string{}

	for line := range input {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		// 正規表現で『カンマ区切りの整数列』を検出
		// 1つのまたは more than one 数値を区切る
		// そして最終的に末尾のカンマを許容
		re := `^\d+(?:,\d+)*$`
		if strings.HasPrefix(line, "^") && strings.HasSuffix(line, "$") && regex.MatchString(re, line) {
			validLines = append(validLines, line)
		}
	}

	// 最後に validLines の数を出力
	fmt.Printf("valid=%d\n", len(validLines))
} 

import "regexp"

func regex.MatchString(pattern, s string) bool {
	r := regexp.MustCompile(pattern)
	return r.MatchString(s)
}
