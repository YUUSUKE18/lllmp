package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines []string
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if sc.Err() {
			continue
		}
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		// カンマ区切りの正規表現：1個以上の数字列が含まれ、末尾のカンマは許容
		re := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}
	fmt.Printf("valid=%d\n", len(validLines))
}
