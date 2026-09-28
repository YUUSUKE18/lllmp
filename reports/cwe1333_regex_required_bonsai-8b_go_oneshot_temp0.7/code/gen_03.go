package main

import (
	"regexp"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if sc.Text() == "" {
			break
		}
		// カンマ区切りの正規表現（1個以上の数字列）
		re := regexp.MustCompile(`^$$(\d+[,\.]?\d+)*$$`)
		if re.MatchString(strings.TrimSpace(sc.Text())) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
