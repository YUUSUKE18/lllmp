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
	input := strings.TrimSpace(sc.Text())
	if input == "" {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	counts := make(map[int]int)
	var total int64 = 0

	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if w == "" {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		counts[n]++
		total += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), total)
}
