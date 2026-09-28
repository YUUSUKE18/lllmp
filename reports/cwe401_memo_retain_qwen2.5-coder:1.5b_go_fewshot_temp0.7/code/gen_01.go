package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = map[int]int{}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil {
			continue
		}
		if n == 1 {
			total++
			continue
		}
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		if val, ok := memo[n]; ok {
			total += val
		} else {
			val = 0
			for n != 1 {
				if n%2 == 0 {
					n /= 2
				} else {
					n = 3*n + 1
				}
				val++
			}
			memo[n] = val
			total += val
		}
	}
	fmt.Printf("total=%d\n", total)
}
