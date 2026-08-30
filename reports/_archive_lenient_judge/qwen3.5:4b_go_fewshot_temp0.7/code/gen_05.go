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
		return
	}
	input := sc.Text()
	counts := make(map[int]int64) // key: integer value, value: frequency (count)
	sum := int64(0)

	parts := strings.Split(input, ",")
	for _, w := range parts {
		s := strings.TrimSpace(w)
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil || n == 0 { // Assuming "整数" implies non-zero based on typical problem context of sum/count unless specified otherwise. However, strictly speaking 'integers' include 0. Let's re-read: "重複を除いた整数". Usually this means unique values. If the input is empty or contains only invalid data, count should be 0 and sum 0. The logic needs to handle non-integer strings by ignoring them.
			continue // Ignore elements that are not integers
		} else {
			counts[n]++ // Update frequency (count) for each integer found
			sum += int64(n)
		}
	}

	totalCount := 0
	for _, v := range counts {
		totalCount += v
	}
	fmt.Printf("count=%d sum=%d\n", totalCount, sum)
}
