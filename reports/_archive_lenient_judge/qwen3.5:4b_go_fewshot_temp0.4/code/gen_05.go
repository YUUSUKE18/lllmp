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
		fmt.Println("count=0 sum=0")
		return
	}

	input := sc.Text()
	counts := make(map[int]int64)
	sum := int64(0)

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		n, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[n]++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
