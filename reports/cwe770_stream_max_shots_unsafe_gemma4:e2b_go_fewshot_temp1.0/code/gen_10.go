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
	count := 0
	maxVal := int64(-9223372036854775808) // int64の最小値で初期化 (Goのint64の範囲を考慮して十分小さな値)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			n, err := strconv.ParseInt(part, 10, 64)
			if err == nil {
				count++
				if n > maxVal {
					maxVal = n
				}
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
