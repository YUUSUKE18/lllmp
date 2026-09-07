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
	lines, chars := 0, 0
	mem := make(map[int]int)
	for {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			break
		}
		if n == 1 {
			fmt.Printf("total=%d\n", lines)
			break
		}
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		if _, exists := mem[n]; exists {
			fmt.Printf("total=%d\n", lines+mem[n])
			break
		}
		mem[n] = lines
		lines++
		chars++
		if buf[i] == '\n' {
			lines++
		}
	}
}
