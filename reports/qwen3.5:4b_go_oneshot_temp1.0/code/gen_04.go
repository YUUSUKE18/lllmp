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
	sc.Scan()
	input := sc.Text()

	lines := strings.Split(input, ",")
	counts := make(map[int]int)
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		counts[n]++
	}

	sum := 0
	for _, cnt := range counts {
		sum += cnt
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
