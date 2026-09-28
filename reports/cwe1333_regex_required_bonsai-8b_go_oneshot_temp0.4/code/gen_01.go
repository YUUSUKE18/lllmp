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
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		// カンマ区切りの整数列を検出
		re := regexp.MustCompile(`^(-?\d+)(?:,(-?\d+))*$`)
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}
	fmt.Printf("valid=%d\n", len(validLines))
}
