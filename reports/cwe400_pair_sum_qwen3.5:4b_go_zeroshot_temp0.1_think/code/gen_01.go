package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// Read target value from the first line
	if !scanner.Scan() {
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}

	count := int64(0)
	seen := make(map[int64]int64)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore non-integer lines
		}

		complement := target - val
		if freq, ok := seen[complement]; ok {
			count += freq
		}
		seen[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
