package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var memo map[int]int
	memo = make(map[int]int)
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	lines, chars := 0, 0
	for {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Printf("total=0\n")
			return
		}
		if _, found := memo[n]; !found {
			if n%2 == 0 {
				memo[n] = memo[n/2] + 1
			} else {
				memo[n] = memo[3*n+1] + 1
			}
		}
		lines++
		chars += len(strconv.Itoa(memo[n]))
		if lines == 1000000 {
			break
		}
	}
	fmt.Printf("total=%d\n", memo[1])
}
