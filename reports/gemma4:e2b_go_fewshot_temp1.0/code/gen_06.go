package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if sc.Scan() {
		line := sc.Text()
		parts := strings.Split(line, ",")

		uniqueSet := make(map[int]bool)
		sum := int64(0)

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.Atoi(trimmedPart)
			if err != nil {
				continue
			}

			if !uniqueSet[n] {
				uniqueSet[n] = true
				sum += int64(n)
			}
		}

		count := len(uniqueSet)
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
