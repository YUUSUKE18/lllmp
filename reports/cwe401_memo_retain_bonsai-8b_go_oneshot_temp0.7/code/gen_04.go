package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
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
			fmt.Println("total=0\n")
			continue
		}
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		count := 0
		for n != 1 {
			if n in memo {
				count += memo[n]
			} else {
				memo[n] = 1 + count(n)
				count = memo[n]
			}
			n = n%2 == 0 ? n/2 : 3*n + 1
		}
		fmt.Printf("total=%d\n", count)
	}
}
