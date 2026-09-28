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
	numbers := strings.Split(input, ",")
	set := make(map[int]struct{})
	totalSum int64 = 0

	for _, s := range numbers {
		w := strings.TrimSpace(s)
		if w == "" {
			continue
		}
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		set[n] = struct{}{}
		totalSum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(set), totalSum)
}
