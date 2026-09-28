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
	cache := make(map[int64]int)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		fields := strings.Fields(line)
		for _, f := range fields {
			n, err := strconv.ParseInt(f, 10, 64)
			if err != nil {
				continue
			}
			count, exists := cache[n]
			if !exists {
				if n == 1 {
					cache[1] = 0
					count = 0
				} else if n%2 == 0 {
					nextN := n / 2
					count = 1 + cache[nextN]
					cache[n] = count
				} else {
					nextN := 3*n + 1
					count = 1 + cache[nextN]
					cache[n] = count
				}
			}
			total += count
		}
	}
	fmt.Printf("total=%d\n", total)
}
