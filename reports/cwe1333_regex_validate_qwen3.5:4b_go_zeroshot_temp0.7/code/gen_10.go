package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isInt(str string) bool {
	if len(str) == 0 {
		return false
	}
	for _, r := range str {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}
	parts := strings.Split(line, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if !isInt(part) {
			return false
		}
	}
	return true
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	count := 0
	line, err := reader.ReadString('\n')
	for err == nil {
		line = strings.TrimSuffix(line, "\n")
		if isValidLine(line) {
			count++
		}
		line, err = reader.ReadString('\n')
	}
	fmt.Printf("valid=%d\n", count)
}
