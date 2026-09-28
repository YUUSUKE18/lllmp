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
	var validLines = 0
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if sc.Err() {
			continue
		}
		line := strings.TrimSpace(sc.Text())
		if !line {
			continue
		}
		// ラベルと数字列を分ける
		parts := regexp.MustCompile(`([\d,]+)`).FindAllString(line, -1)
		if len(parts) > 1 {
			// ラベルが見つかった場合、行は妥当
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
