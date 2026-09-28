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

	countSumMap := make(map[int]int64)
	for _, s := range strings.Split(sc.Text(), ",") {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		countSumMap[n]++
	}

	totalCount := 0
	totalSum := int64(0)
	for c, count := range countSumMap {
		totalCount += count
		totalSum += int64(c)*int64(count)
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
