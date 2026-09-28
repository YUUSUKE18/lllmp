package main

import (
	"regexp"
	"strconv"
	strings"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if !sc.Done() {
			continue
		}
		line := strings.TrimSpace(sc.Text())
		if !line {
			continue
		}
		// カンマ区切りの正規表現（1以上の数字列）
		regexpPattern := regexp.MustCompile(`^(-?\d+)(?:,(-?\d+))*$`)
		if regexPattern.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
