package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	lines := 0
	validRe := regexp.MustCompile(`^\s*[\d,]+\s*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if validRe.MatchString(line) {
			lines++
		}
	}
	fmt.Printf("valid=%d\n", lines)
}
