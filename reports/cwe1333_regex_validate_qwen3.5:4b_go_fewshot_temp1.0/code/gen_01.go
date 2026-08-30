package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func validRow(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	parts := strings.Split(s, ",")
	i := 0
	for i < len(parts) {
		part := strings.TrimSpace(parts[i])
		_, err := strconv.Atoi(part)
		if err != nil {
			return false
		}
		i++
	}
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if validRow(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
