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
		sc.Scan()
		if !sc.Err() {
			if sc.Text() == "" {
				continue
			}
			n, _ := strconv.Atoi(sc.Text())
			if seen[n] {
				continue
			}
			seen[n] = true
			operations := 0
			for n != 1 {
				if n%2 == 0 {
					n /= 2
				} else {
					n = 3*n + 1
				}
				operations++
			}
			total += operations
		} else {
			break
		}
	}
	fmt.Printf("total=%d\n", total)
}
