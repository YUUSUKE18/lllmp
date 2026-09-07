package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int]int)
	sum := 0
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil || n < 1 {
			continue
		}
		if n == 1 {
			sum += 0
			continue
		}
		if result, ok := cache[n]; ok {
			sum += result
			continue
		}
		result := 0
		if n%2 == 0 {
			result = n / 2
		} else {
			result = 3*n + 1
		}
		cache[n] = result
		sum += result
	}
	fmt.Printf("total=%d\n", sum)
}
