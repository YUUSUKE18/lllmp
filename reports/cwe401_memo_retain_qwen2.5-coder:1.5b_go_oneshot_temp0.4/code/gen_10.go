package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	mem := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n == 1 {
			total++
			continue
		}
		if _, ok := mem[n]; ok {
			total += mem[n]
			continue
		}
		count := 0
		for n != 1 {
			count++
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			if _, ok := mem[n]; ok {
				count += mem[n]
				break
			}
			mem[n] = count
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
