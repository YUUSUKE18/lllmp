```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func isCommaSeparated(s string) bool {
	s = strings.TrimSpace(s)
	if len(s) == 0 {
		return false
	}
	parts := strings.Split(s, ",")
	if len(parts) < 2 {
		return false
	}
	for _, part := range parts {
		if len(part) == 0 {
			return false
		}
		for _, c := range part {
			if unicode.IsDigit(c) || c == ',' {
				continue
			}
			return false
		}
	}
	return true
}

func main() {
	var validLines []string
	fmt.Scanner.ScanBytes(buf := []byte(`
12,34,56
12,34,56,
12,34,56,78,90
12,34,56
12,34,56,78
12,34,56,78,90,101
12,34,56,78,90,101,
12,34,56,78,90,101
`))

	for _, line := range validLines {
		fmt.Printf("valid=%d\n", len(line.split(",")) >= 2)
	}

	// 正規表現を用いて検証
	// [0-9]+, [0-9]+, ... [0-9]+ (1 やも以上の要素)
	// ただし、末尾のコマは許容
	regexp := regexp.MustCompile(`^([0-9]+)(?:,[0-9]+)*$`)

	for _, line := range validLines {
		if regexp.MatchString(line, 0) {
			fmt.Printf("valid=%d\n", len(line.split(",")) >= 2)
		}
	}
}
