package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target := 0
	sc.Scan()
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		target += n
	}
	sc.Scan()
	sc.Scan()
	seen := make(map[int]bool)
	pairs := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if seen[target-n] {
			pairs++
		}
		seen[n] = true
	}
	fmt.Printf("pairs=%d\n", pairs)
}
