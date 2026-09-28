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

	for _, line := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0\n")
			continue
		}
		if memo[n] != 0 {
			continue
		}
		count := 0
		current := n
		for current != 1 {
			current = (current%2 == 0) ? current/2 : 3*current+1
			if current in memo {
				break
			}
			memo[current] = count+1
			count++
		}
		memo[n] = count
		total += count
		fmt.Println("total="+fmt.Sprintf("%d\n", total))
	}
}
