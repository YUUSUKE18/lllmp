package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	max := 0
	first := true
	seen := make(map[int]bool)
	total := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil || n < 1 {
			continue
		}
		if seen[n] {
			total += seen[n]
		} else {
			seen[n] = true
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			total++
		}
		if first || n > max {
			max = n
			first = false
		}
	}
	fmt.Printf("total=%d\n", total)
}
