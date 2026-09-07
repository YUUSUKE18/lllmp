```go
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
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				if n > 1 {
					fmt.Printf("total=%d\n", total)
					total = 0
				}
				break
			}
			if buf[i] < '0' || buf[i] > '9' {
				continue
			}
			n, err := strconv.Atoi(string(buf[i:i+1]))
			if err != nil {
				continue
			}
			if n == 1 {
				continue
			}
			if memo[n] == 0 {
				if n%2 == 0 {
					memo[n] = memo[n/2] + 1
				} else {
					memo[n] = memo[3*n+1] + 1
				}
			}
			total += memo[n]
		}
		if err != nil {
			break
		}
	}
}
