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
	if !sc.Scan() {
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")

	countMap := make(map[int]int)
	sumTotal := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		countMap[val]++
		sumTotal += int64(val)
	}

	fmt.Printf("count=%d sum=%d\n", len(countMap), sumTotal)
}
