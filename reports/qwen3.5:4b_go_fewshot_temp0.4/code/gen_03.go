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
		fmt.Printf("count=0 sum=0\n")
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	countMap := make(map[int]int)
	sum := int64(0)

	for _, w := range parts {
		w = strings.TrimSpace(w)
		if w == "" {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		countMap[n]++
		sum += int64(n)
	}

	var count int
	for _, c := range countMap {
		count += c
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
