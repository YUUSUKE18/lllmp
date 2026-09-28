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
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if n, err := strconv.Atoi(s); err == nil {
			counts[n]++
		}
	}

	var total int64
	for v := range counts {
		total += int64(v) * int64(counts[v])
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), total)
}
