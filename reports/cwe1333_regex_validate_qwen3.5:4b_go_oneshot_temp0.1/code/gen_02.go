package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	
	parts := strings.Split(s, ",")
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			return false
		}
		_, err := fmt.Sscanf(p, "%d", nil)
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
		if isValidLine(line) {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
