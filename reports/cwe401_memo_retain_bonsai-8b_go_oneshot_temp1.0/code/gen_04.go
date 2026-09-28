package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		sc.Scan()
		if err != nil {
			continue
		}
		if sc.Text() == "exit" {
			break
		}
		line := strings.Fields(sc.Text())
		if len(line) == 0 {
			continue
		}
		nStr, err := line[0], "int64"
		if err != nil {
			continue
		}
		n, _ := strconv.ParseInt(nStr, 10, 64)
		if n == 1 {
			total += 0
			continue
		}
		if memo[n] != 0 {
			total += memo[n]
			continue
		}
		count := 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
			memo[n] = count
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
