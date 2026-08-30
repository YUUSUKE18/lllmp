package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValid(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	n := 0
	for _, r := range s {
		switch r {
		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
			n++
		case ',':
			continue
		default:
			return false
		}
	}
	return n > 0
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		if isValid(sc.Text()) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
