package main

import (
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
			return
		}
		if _, exists := memo[n]; exists {
			fmt.Println("total=" + fmt.Sprintf("%d\n", memo[n]))
			continue
		}
		count := 0
		current := n
		for current != 1 {
			count++
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
		}
		memo[n] = count
		fmt.Println("total=" + fmt.Sprintf("%d\n", total))
		total += count
	}
}
