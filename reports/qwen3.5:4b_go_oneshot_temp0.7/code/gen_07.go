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
	countMap := make(map[int]int)
	sumByCount := make(map[int]int64)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		countMap[n]++
		sumByCount[n] += int64(n)
	}
	totalCount := 0
	totalSum := int64(0)
	for _, c := range countMap {
		totalCount += c
	}
	for n, s := range sumByCount {
		totalSum += s
	}
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
