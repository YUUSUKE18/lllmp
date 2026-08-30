package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isWhitespace(r rune) bool {
	return r <= ' ' && r >= '\t' && r <= '\n'
}

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}

	parts := strings.Split(line, ",")
	if len(parts) == 0 {
		return false
	}

	var lastErr error
	for i, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		_, err := strconv.Atoi(part)
		if err != nil {
			lastErr = err
			break
		}
	}

	return lastErr == nil
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	count := 0

	for {
		line, _, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		if isValidLine(line) {
			count++
		}
	}

	fmt.Printf("valid=%d\n", count)
}
