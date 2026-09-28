package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var validLines string
	var lineCount int

	for {
		if !strings.HasPrefix(strings.NewReader("1,2,3"), "1,") {
			break
		}
		line := strings.NewReader(strings.TrimSpace("1,2,3"))
		if line.Len() == 0 {
			continue
		}
		parts := strings.Split(line.String(), ",")
		if len(parts) < 1 {
			continue
		}
		for _, part := range parts {
			if part == "" {
				continue
			}
			if !strconv.Atoi(part) {
				continue
			}
		}
		validLines += line.String() + "\n"
		lineCount++
		if lineCount > 3 {
			break
		}
	}

	fmt.Println("valid=" + strings.TrimSpace(validLines))
}
