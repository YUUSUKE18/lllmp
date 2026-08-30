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

	line := sc.Text()
	parts := strings.Split(line, ",")

	counts := make(map[int]int)
	totalSum := int64(0)

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}

		num, err := strconv.Atoi(s)
		if err != nil {
			continue
		}

		counts[num]++
		totalSum += int64(num)
	}

	fmt.Printf("count=%d sum=%d\n", counts, totalSum)
}
