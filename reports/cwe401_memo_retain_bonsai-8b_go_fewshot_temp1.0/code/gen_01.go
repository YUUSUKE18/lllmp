package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"runtime"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	mem := make(map[int]int)
	total := 0
	for {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			sc.Scan()
			continue
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if _, exists := mem[n]; exists {
			fmt.Printf("total=%d\n", total)
			continue
		}
		mem[n] = 0
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		total += count
		sc.Scan()
	}
	fmt.Printf("total=%d\n", total)
}
