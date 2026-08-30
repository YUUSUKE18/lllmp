package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := os.Stdout

	var validCount int
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	for line != "" {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		isValid := true

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				isValid = false
				break
			}
			_, err := strconv.Atoi(part)
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}

		line, _ = reader.ReadString('\n')
	}

	fmt.Fprintf(writer, "valid=%d\n", validCount)
}
