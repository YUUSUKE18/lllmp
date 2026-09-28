package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sum := 0
	visited := make(map[int]int)
	for sc.Scan() {
		f := sc.Text()
		if len(f) == 0 {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if visited[n] != 0 {
			sum += visited[n]
			continue
		}
		sum += goFastestStep(n, visited)
	}
	fmt.Printf("total=%d\n", sum)
}

func goFastestStep(n int, visited map[int]int) int {
	if n == 1 {
		return 0
	}
	if visited[n] != 0 {
		return visited[n]
	}
	if n%2 == 0 {
		visited[n] = goFastestStep(n/2, visited) + 1
	} else {
		visited[n] = goFastestStep(3*n+1, visited) + 1
	}
	return visited[n]
}
