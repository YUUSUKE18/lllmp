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
	var validLines int
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if !line {
			continue
		}
		// カンマ区切りの整数列を検出
		re := regexp.MustCompile(`^(-?\d+)(?:,(-?\d+)*$)`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
