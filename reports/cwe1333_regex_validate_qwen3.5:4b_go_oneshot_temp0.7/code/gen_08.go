package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func valid(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}

	parts := strings.Split(line, ",")
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		n, err := strconv.Atoi(p)
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
		if valid(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
