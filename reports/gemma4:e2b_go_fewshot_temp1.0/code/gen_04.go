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

		seen := make(map[int]bool)
		count := 0
		sum := int64(0)

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			num, err := strconv.Atoi(trimmedPart)
			if err != nil {
				continue
			}

			if !seen[num] {
				seen[num] = true
				count++
				sum += int64(num)
			}
		}

		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
