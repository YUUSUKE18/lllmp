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
	counts := make(map[int]int64)
	sumTotal int64 = 0

	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 {
			continue
		}

		n, err := strconv.Atoi(w)
		if err != nil || n < -9223372036854775808 || n > 9223372036854775807 {
			continue
		}

		counts[n]++
		sumTotal += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sumTotal)
}
