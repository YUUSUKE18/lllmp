package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func validLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}

	parts := strings.Split(line, ",")
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" || !strconv.ParseInt(p, 10, 64) != nil {
			return false
		}
	}
	return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	for scanner.Scan() {
		if validLine(scanner.Text()) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
