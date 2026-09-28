package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line := strings.NewReader("").Readline()
		if line == "" {
			break
		}
		line = strings.TrimSpace(line)
		if !strings.Contains(line, ",") {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	fmt.Println("valid=" + fmt.Sprintf("%d", len(validLines)))
}
