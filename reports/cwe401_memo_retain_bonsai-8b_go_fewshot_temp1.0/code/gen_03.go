package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"container/map"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int]int)
	total := 0

	for {
		n, err := sc.ReadInt()
		if err != nil {
			break
		}
		if n == 1 {
			total += 0
			continue
		}

		// 異なるnを処理
		if _, ok := memo[n]; ok {
			total += memo[n]
			continue
		}

		count := 0
		memo[n] = 0

		for n != 1 {
			n = n%2 == 0 ? n/2 : 3*n + 1
			memo[n] = count + memo[n]
			count++
		}

		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
