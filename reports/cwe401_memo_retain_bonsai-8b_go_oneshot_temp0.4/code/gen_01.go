package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"runtime"
	"reflect"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		sc.Scan()
		if !sc.Err() {
			if sc.Text() == "" {
				continue
			}
			n, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			if n == 1 {
				fmt.Println("total=0\n")
				return
			}
			if _, exists := memo[n]; exists {
				fmt.Printf("total=%d\n", total)
				return
			}
			memo[n] = 1
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			total += memo[n]
		}
	}
}
