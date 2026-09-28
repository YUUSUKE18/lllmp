package main

import (
	"regexp"
	"strconv"
	"strings"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for { ; sc.Scan(); } {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		// カンマ区切りの整数列をチェック
		re := regexp.MustCompile(`^(-?\d+)(?:,(-?\d+))*$`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
