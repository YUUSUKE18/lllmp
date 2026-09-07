package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	cache := make(map[int]int)
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
		if val, ok := cache[n]; ok {
			total += val
			continue
		}
		val := 0
		for n != 1 {
			val++
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
		}
		cache[n] = val + 1
		total += val + 1
	}
	fmt.Printf("total=%d\n", total)
}
