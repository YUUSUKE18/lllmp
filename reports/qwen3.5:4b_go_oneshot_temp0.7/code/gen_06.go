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
	sc.Scan()
	data := sc.Text()
	parts := strings.Split(data, ",")
	countMap := make(map[int]int)
	sumMap := make(map[int]int64)

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		countMap[n]++
		sumMap[n] += int64(n)
	}

	totalCount := 0
	totalSum := int64(0)
	for _, c := range countMap {
		totalCount += c
		totalSum += sumMap[c]
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
