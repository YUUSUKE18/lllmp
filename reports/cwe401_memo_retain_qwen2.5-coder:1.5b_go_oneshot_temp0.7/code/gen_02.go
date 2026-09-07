package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	seen := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if seen[n] == 0 {
			total += computeSteps(n, seen)
		}
	}
	fmt.Printf("total=%d\n", total)
}

func computeSteps(n int, seen map[int]int) int {
	if n == 1 {
		return 0
	}
	if seen[n] != 0 {
		return seen[n]
	}
	if n%2 == 0 {
		seen[n] = 1 + computeSteps(n/2, seen)
	} else {
		seen[n] = 1 + computeSteps(3*n+1, seen)
	}
	return seen[n]
}
