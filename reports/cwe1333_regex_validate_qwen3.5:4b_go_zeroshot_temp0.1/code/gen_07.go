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
	writer := bufio.NewWriter(os.Stdout)

	validCount := 0
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line, _ := scanner.Text()
		if line == "" {
			continue
		}
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}

		parts := strings.Split(line, ",")
		if len(parts) == 0 {
			fmt.Fprintln(writer, "valid=0")
			return
		}

		validLine := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				validLine = false
				break
			}
			if _, err := strconv.Atoi(part); err != nil {
				validLine = false
				break
			}
		}

		if validLine {
			validCount++
		}
	}

	fmt.Fprintln(writer, "valid="+strconv.Itoa(validCount))
	writer.Flush()
}
