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
	sc.Scan()
	input := sc.Text()
	words := strings.Split(input, ",")

	var seen = make(map[string]bool)
	var count int
	sum := int64(0)

	for _, w := range words {
		s := strings.TrimSpace(w)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil || seen[s] {
			continue
		}
		sum += n
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
