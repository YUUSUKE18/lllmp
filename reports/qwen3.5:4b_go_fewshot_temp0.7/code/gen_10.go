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
	if !sc.Scan() {
		return
	}

	input := sc.Text()
	csvStr := strings.Split(input, ",")

	count := 0
	sum := int64(0)
	seen := make(map[int64]bool)

	for _, s := range csvStr {
		w := strings.TrimSpace(s)
		if w == "" {
			continue
		}

		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}

		if seen[n] {
			continue
		}
		seen[n] = true
		sum += int64(n)
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
