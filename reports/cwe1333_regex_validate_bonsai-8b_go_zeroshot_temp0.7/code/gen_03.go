package main

import (
	"fmt"
	"strings"
	"regexp"
)

func main() {
	scanner := regexp.MustCompile(`^$\s*(\d+[\s,]*\d+[\s,]*)*\s*$`)
	var validLines []string

	for {
		if !scanner.Scan() {
			break
		}
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		if len(strings.Split(line, ",") > 0) >= 1 {
			validLines = append(validLines, line)
		}
	}

	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Println("valid=0")
	}
}
