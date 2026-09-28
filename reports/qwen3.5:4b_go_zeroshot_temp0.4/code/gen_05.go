package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader(""))
	if reader == nil {
		return
	}
	input, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	input = strings.TrimSpace(input)
	if input == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(input, ",")
	counts := make(map[int]int)
	sumBig := big.NewInt(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}
		counts[val]++
		sumBig.Add(sumBig, big.NewInt(int64(val)))
	}

	var count int
	var sum int
	for _, c := range counts {
		count += c
	}
	sum = int(sumBig.Int64())

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
