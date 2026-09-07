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
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
		} else if _, ok := mem[n]; ok {
			total += mem[n]
		} else {
			if n%2 == 0 {
				mem[n] = 1 + mem[n/2]
			} else {
				mem[n] = 1 + mem[3*n+1]
			}
			total += mem[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}
