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
	memo := make(map[int]int)

	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if !sc.Text() {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if _, exists := memo[n]; exists {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 1
		count := 1
		for n%2 == 0 {
			n /= 2
			count++
		}
		if n%2 == 1 {
			n = 3*n + 1
			count++
		}
		for n != 1 {
			if n%2 == 0 {
				n /= 2
				count++
			} else {
				n = 3*n + 1
				count++
			}
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
