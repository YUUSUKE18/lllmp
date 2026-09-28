package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^[0-9]+(?:,[0-9]+)*(?:,)?$`)

	scanner := bufio.NewScanner(os.Stdin)
	count := 0

	for scanner.Scan() {
		line := scanner.Text()
		trimmed := strings.TrimSpace(line)

		if trimmed == "" {
			continue
		}

		if re.MatchString(trimmed) {
			count++
		}
	}

	fmt.Printf("valid=%d\n", count)
}
