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
	fields := strings.Split(input, ",")
	countMap := make(map[int]int)
	sumMap := make(map[int]int)

	for _, f := range fields {
		s := strings.TrimSpace(f)
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		countMap[n]++
		sumMap[n] += n
	}

	var count int
	var sum int64
	first := true
	for n, cnt := range countMap {
		if first || n < sum {
			count = cnt
			sum = int64(cnt) * int64(n)
			first = false
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
