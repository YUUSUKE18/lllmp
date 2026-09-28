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
	count := 0
	sum := 0
	var currentVal int
	var currentCount int
	first := true
	for _, s := range strings.Fields(sc.Text()) {
		if colon := strings.IndexRune(s, ':'); colon != -1 {
			valStr := s[:colon]
			countStr := s[colon+1:]
			if valStr == "" || countStr == "" {
				continue
			}
			n, err := strconv.Atoi(valStr)
			if err != nil {
				continue
			}
			c, err := strconv.Atoi(countStr)
			if err != nil {
				continue
			}
			if first || n > currentVal {
				currentVal = n
				currentCount = c
				count = 0
				sum = 0
				first = false
			} else if n == currentVal {
				currentCount += c
			}
			count += currentCount
			sum += currentVal * currentCount
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
