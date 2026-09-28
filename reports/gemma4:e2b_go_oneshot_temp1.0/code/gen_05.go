package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)
	fields := strings.Split(strings.TrimSpace(data), ",")

	seen := make(map[int64]bool)
	var count int
	var sum int64

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			continue
		}

		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
