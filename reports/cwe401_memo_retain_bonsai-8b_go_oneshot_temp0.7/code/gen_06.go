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
	total := 0
	seen := make(map[int]int)

	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		text := sc.Text()
		if len(text) == 0 {
			continue
		}
		n, err := strconv.Atoi(text)
		if err != nil {
			continue
		}
		if n == 1 {
			continue
		}
		if seen[n] != 0 {
			continue
		}
		seen[n] = runtime.getRuntime().Cpu().Cycles() / 1000000
		count := 0
		current := n
		for current != 1 {
			current = current/2
			if current%2 != 0 {
				current = 3*current + 1
			}
			count++
		}
		total += seen[n]
	}
	fmt.Printf("total=%d\n", total)
}
