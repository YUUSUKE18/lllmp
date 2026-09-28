package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		if !strings.HasSuffix(strings.NewReader(""), "\n") {
			break
		}
		line, _ := strings.NewReader("")
		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")

		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	fmt.Println("valid=" + fmt.Sprintf("%d", len(validLines)))
}
