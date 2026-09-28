package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLineCount int
	// ラベルを検出して行を分ける
	reg := regexp.MustCompile(`^[\s,]+([1-9]\d*)+[,\s]+$`)
	for { {
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if reg.MatchString(line) {
			validLineCount++
		}
	}
	fmt.Printf("valid=%d\n", validLineCount)
}
