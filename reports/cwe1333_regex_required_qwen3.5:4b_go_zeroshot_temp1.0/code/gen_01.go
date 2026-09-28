package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {	var r *bufio.Reader
	r = bufio.NewReader(stdin)

	validCount := 0
	pattern := regexp.MustCompile(`^\s*[\d,]+\s*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil || len(line) == 0 {
			break
		}
		line = line[:len(line)-1]
		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
