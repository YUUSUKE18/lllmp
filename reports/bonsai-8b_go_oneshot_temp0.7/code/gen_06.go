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
	count := 0
	sum := 0
	first := true
	seen := make(map[int]bool)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if !first {
			if !seen[n] {
				sum += n
				count++
				seen[n] = true
			}
		} else {
			first = false
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
