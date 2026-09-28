package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"container/map"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	memo := make(map[int]int)
	total := 0
	for strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(strings.Fields(sc.Text())[0])
		if err != nil {
			continue
		}
		if n == 1 {
			continue
		}
		if m, ok := memo[n]; ok {
			continue
		}
		count := 0
		current := n
		for current != 1 {
			current = current%2 == 0 ? current/2 : 3*current+1
			count++
			memo[current] = count
		}
		memo[n] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
