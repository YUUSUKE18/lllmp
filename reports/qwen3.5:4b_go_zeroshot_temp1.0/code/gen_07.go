package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var tokens []string
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}
		tokens = append(tokens, strings.Fields(line)...)
	}

	seen := make(map[int64]bool)
	totalSum := int64(0)

	for _, s := range tokens {
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		if !seen[val] {
			seen[val] = true
			totalSum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(seen), totalSum)
}
