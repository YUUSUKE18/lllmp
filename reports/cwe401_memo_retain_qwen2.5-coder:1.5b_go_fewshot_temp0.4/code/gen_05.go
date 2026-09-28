package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 64*1024)
	total := 0
	memo := make(map[int]int)
	for {
		n, err := r.Read(buf)
		if err != nil {
			break
		}
		for i := 0; i < n; i++ {
			chars++
			if buf[i] == '\n' {
				lines++
			}
		}
		if err != nil {
			break
		}
		if i := memo[n]; i != 0 {
			fmt.Printf("total=%d\n", total+i)
			continue
		}
		memo[n] = 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			memo[n]++
			total++
		}
	}
	fmt.Printf("total=%d\n", total)
}
