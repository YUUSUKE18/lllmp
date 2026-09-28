package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	var total int64
	var first bool
	count, sum := sc.Scan(), 0
	for i := 0; i < count; i++ {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := strings.Fields(line)
		for _, p := range parts {
			n, err := strconv.Atoi(p)
			if err != nil {
				continue
			}
			total += int64(n)
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, total)
}
