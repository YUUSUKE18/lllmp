package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()

	var counts map[int]int64
	for _, token := range sc.Text() {
		if token == '\n' || token == ' ' {
			continue
		}
		if len(token) > 0 && token[0] != ',' {
			n, err := strconv.Atoi(string(token))
			if err != nil {
				continue
			}
			counts[n]++
		}
	}

	var total int64 = 0
	for _, count := range counts {
		total += (int64(len(counts))) * count
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), total)
}
