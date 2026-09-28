package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if err := sc.Scan(); err != nil {
		return
	}
	target, _ = strconv.ParseInt(sc.Text(), 10, 64)

	sums := make(map[int64]int)
	count := 0

	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		n, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}

		diff := target - n
		if pairCount, ok := sums[diff]; ok {
			count += pairCount
		}
		sums[n]++
	}

	fmt.Printf("pairs=%d\n", count)
}
