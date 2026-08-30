package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func valid(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	parts := strings.Split(s, ",")
	for _, p := range parts {
		if p != "" {
			if _, err := strconv.Atoi(p); err != nil {
				return false
			}
		}
	}
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if valid(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
