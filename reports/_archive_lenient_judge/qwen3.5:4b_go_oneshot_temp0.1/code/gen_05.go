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
	pairs := make(map[int]int64)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		n, err := strconv.Atoi(s)
		if err != nil || n == 0 {
			continue
		}
		counts[n]++
		sum += int64(n * counts[n])
	}
	fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
}

var (
	counts map[int]int
	totalSum int64
)
