package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewScanner(os.Stdin)
	validCount := 0

	for reader.Scan() {
		line := strings.TrimSpace(reader.Text())
		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) > 0 {
				var num int64
				fmt.Sscanf(part, "%d", &num)
			}
		}

		validCount++
	}

	fmt.Println(fmt.Sprintf("valid=%d", validCount))
}
