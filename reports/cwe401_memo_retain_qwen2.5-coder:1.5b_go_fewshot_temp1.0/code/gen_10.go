package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	blocked := make(map[int]int)
	total := 0
	for {
		s, err := r.ReadString('\n')
		s = strings.TrimSpace(s)
		if err != nil {
			break
		}
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		total += f(n, blocked)
	}
	fmt.Printf("total=%d\n", total)
}

func f(n int, blocked map[int]int) int {
	if n == 1 {
		return 0
	}
	if _, ok := blocked[n]; ok {
		return blocked[n]
	}
	if n%2 == 0 {
		result := 1 + f(n/2, blocked)
		blocked[n] = result
		return result
	}
	result := 1 + f(3*n+1, blocked)
	blocked[n] = result
	return result
}
