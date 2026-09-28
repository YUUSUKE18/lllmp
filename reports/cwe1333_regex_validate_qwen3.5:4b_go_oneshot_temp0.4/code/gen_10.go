package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func validLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	parts := strings.Split(s, ",")
	for _, p := range parts {
		if p == "" {
			return false
		}
		_, err := fmt.Sscanf(p, "%d")
		if err != nil {
			return false
		}
	}
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if validLine(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
