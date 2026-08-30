package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	line = strings.TrimSpace(line)
	if line == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(line, ",")
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
	for _, c := range counts {
		count += c
	}

	fmt.Printf("count=%d sum=%s\n", count, sumBig.String())
}
