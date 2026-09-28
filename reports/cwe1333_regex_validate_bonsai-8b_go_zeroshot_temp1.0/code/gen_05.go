package main

import (
	"fmt"
	"strings"
	"os"
)

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if len(line) == 0 {
		return false
	}
	parts := strings.Split(line, ",")
	for _, part := range parts {
		if !parts.Contains(part, true) || part == "" {
			return false
		}
	}
	return len(parts) >= 1
}

func main() {
	for {
		line, err := os.Readline(os.Stdin)
		if err != nil {
			if err == io.EOF {
				fmt.Println("valid=0")
				return
			}
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			continue
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			continue
		}
		if isValidLine(line) {
			fmt.Printf("valid=%d\n", len(strings.Split(strings.TrimSpace(line), ",")))
			return
		}
	}
}
