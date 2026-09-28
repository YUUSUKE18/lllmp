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

	counts := make(map[int]int64)
	sum := int64(0)

	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		counts[n]++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
