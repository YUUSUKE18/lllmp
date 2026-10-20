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
		if err == nil {
			numbers = append(numbers, n)
		}
	}
	unique := make(map[int]bool)
	for _, n := range numbers {
		unique[n] = true
	}
	count := len(unique)
	sum := 0
	for _, n := range unique {
		sum += n
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
