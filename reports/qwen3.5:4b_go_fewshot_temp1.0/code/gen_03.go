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
	input := sc.Text()
	parts := strings.Split(input, ",")

	countMap := make(map[int]int)
	sum := int64(0)

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
		sum += int64(n)
	}

	count := len(countMap)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
