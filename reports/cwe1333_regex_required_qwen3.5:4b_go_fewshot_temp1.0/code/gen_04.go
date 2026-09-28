package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := 0
	lineRe := regexp.MustCompile(`^\s*[\d,]+\s*$`)
	for sc.Scan() {
		line := sc.Text()
		if lineRe.MatchString(line) {
			lines++
		}
	}
	fmt.Printf("valid=%d\n", lines)
}
