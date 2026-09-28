package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	seen := make(map[int]int)
	for sc.Scan() {
		f := strings.TrimSpace(sc.Text())
		if len(f) == 0 || f[0] == '#' {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n == 1 {
			continue
		}
		count := 0
		for n != 1 {
			if _, ok := seen[n]; ok {
				count += seen[n]
				break
			}
			seen[n] = count
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
