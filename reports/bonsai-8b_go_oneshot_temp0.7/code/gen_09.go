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
	seen := make(map[int]bool)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
