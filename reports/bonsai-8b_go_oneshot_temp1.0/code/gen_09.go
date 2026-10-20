package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var numbers []int
	for _, s := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
	}
	seen := make(map[int]bool)
	count := 0
	sum := 0
	for _, n := range numbers {
		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
