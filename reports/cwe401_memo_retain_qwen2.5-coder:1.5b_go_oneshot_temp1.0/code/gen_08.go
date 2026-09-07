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
	seen := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil || n <= 0 {
			continue
		}
		if _, exists := seen[n]; exists {
			fmt.Printf("total=%d\n", seen[n])
			continue
		}
		if n == 1 {
			fmt.Printf("total=0\n")
			seen[n] = 0
			continue
		}
		seen[n] = 1 + climb(n)
		fmt.Printf("total=%d\n", seen[n])
	}
}

func climb(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + climb(n / 2)
	}
	return 1 + climb(3*n + 1)
}
