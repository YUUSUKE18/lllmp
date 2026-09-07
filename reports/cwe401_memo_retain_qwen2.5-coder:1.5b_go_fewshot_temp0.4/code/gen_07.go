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
	for _, n := range strings.Fields(sc.Text()) {
		if _, ok := mem[n]; ok {
			fmt.Printf("total=%d\n", total)
			return
		}
		mem[n] = 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			mem[n]++
			total++
		}
	}
	fmt.Printf("total=%d\n", total)
}
