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
		fields := strings.Split(line, ",")
		seen := make(map[int]bool)
		count := 0
		sum := int64(0)

		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			n, err := strconv.Atoi(trimmedField)
			if err != nil {
				continue
			}

			if !seen[n] {
				seen[n] = true
				count++
				sum += int64(n)
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
