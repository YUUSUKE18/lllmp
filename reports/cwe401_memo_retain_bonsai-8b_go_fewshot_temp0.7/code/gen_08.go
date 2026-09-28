```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers map[int]int
	for {
		n, err := sc.ReadInt()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if n <= 0 {
			continue
		}
		if m, ok := numbers[n]; ok {
			continue
		}
		numbers[n] = 0
		count := 0
		n = m
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
		}
		fmt.Printf("total=%d\n", count)
	}
}
