package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var sb strings.Builder
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		sb.WriteString(scanner.Text())
	}

	content := sb.String()
	parts := strings.Split(content, ",")

	seen := make(map[int64]bool)
	count := 0
	sum := int64(0)

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		if !seen[val] {
			seen[val] = true
			count++
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
