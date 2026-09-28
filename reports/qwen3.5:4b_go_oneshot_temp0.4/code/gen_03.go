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
	pairs := make(map[int]int)
	sum := int64(0)

	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		pairs[n]++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(pairs), sum)
}
