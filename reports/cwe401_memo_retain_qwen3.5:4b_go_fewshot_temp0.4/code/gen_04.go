package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	mem := make(map[int64]int64)
	total := int64(0)
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		if n == 1 {
			continue
		}
		if val, ok := mem[n]; ok {
			total += val
			continue
		}
		count := 0
		for {
			mem[n] = int64(count)
			if n == 1 {
				break
			}
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
