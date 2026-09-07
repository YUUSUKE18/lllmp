package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sum := 0
	visited := make(map[int]int)
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil || n < 1 {
			continue
		}
		sum += fibonacci(n)
	}
	fmt.Printf("total=%d\n", sum)
}

func fibonacci(n int) int {
	if n == 0 {
		return 0
	} else if n == 1 {
		return 1
	} else {
		if _, ok := visited[n]; ok {
			return visited[n]
		}
		visited[n] = fibonacci(n-1) + fibonacci(n-2)
		return visited[n]
	}
}
