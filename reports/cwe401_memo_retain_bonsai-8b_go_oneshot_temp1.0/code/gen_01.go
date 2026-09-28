package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []string
	for {
		sc.Scan()
		if err := strconv.Atoi(sc.Text()); err == nil {
			numbers = append(numbers, sc.Text())
		}
		if err := strconv.Atoi(sc.Text()); err == nil {
			break
		}
	}

	memo := make(map[int]int)
	total := 0

	for _, numStr := range numbers {
		n, _ := strconv.Atoi(numStr)
		if n == 1 {
			continue
		}
		if m, ok := memo[n]; ok {
			continue
		}
		count := 0
		for n != 1 {
			n = n%2 == 0 ? n/2 : 3*n + 1
			count++
		}
		memo[n] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
