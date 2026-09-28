package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"map"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	seen := map[int]bool{}
	for {
		n, err := sc.ReadIntf()
		if err != nil {
			break
		}
		if seen[n] {
			continue
		}
		seen[n] = true
		steps := 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			steps++
		}
		total += steps
	}
	fmt.Printf("total=%d\n", total)
}
