package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int
	sc.Scan()
	target, _ = strconv.Atoi(sc.Text())

	pairs := 0
	seen := make(map[int]bool)
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil || seen[n] {
			continue
		}
		seen[target-n] = true
		if seen[target-n] {
			pairs++
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
