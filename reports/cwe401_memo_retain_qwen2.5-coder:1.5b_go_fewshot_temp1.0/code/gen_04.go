package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	seen := make(map[int]bool)
	for sc.Scan() {
		f := strings.TrimSpace(sc.Text())
		if f == "" {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if seen[n] {
			continue
		}
		seen[n] = true
		count := 0
		for n != 1 {
			count++
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
