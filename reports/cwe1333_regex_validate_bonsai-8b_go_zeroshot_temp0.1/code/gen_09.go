package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line := strings.TrimSpace(fmt.Scan(os.Stdin))
		if line == "" {
			break
		}
		parts := strings.Split(line, ",")
		if len(parts) >= 2 {
			validLines = append(validLines, line)
		}
	}

	fmt.Println("valid=" + fmt.Sprintf("%d", len(validLines)))
}
