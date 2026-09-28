package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int]int)
	total := 0

	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if !sc.Text() {
			break
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0\n")
			break
		}
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		if memo[n] != 0 {
			continue
		}
		memo[n] = 1 + memo[n/2] if n%2 == 0 else 1 + memo[3*n + 1]
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
