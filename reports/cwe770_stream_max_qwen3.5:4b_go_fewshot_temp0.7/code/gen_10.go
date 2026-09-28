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
		fmt.Printf("count=0 max=\n")
		return
	}
	tokens := strings.Split(sc.Text(), ",")
	count, maxVal := 0, int64(-9223372036854775808)
	first := true
	for _, t := range tokens {
		wt := strings.TrimSpace(t)
		if wt == "" {
			continue
		}
		n, err := strconv.ParseInt(wt, 10, 64)
		if err != nil {
			continue
		}
		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
