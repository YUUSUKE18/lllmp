package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	input := sc.Text()
	tokens := strings.Split(input, ",")

	uniqueInts := make(map[int]int)
	totalSum := 0

	for _, token := range tokens {
		trimmed := strings.TrimSpace(token)
		if trimmed == "" {
			continue
		}

		n, err := strconv.Atoi(trimmed)
		if err != nil {
			continue
		}

		uniqueInts[n]++
		totalSum += n
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueInts), totalSum)
}
