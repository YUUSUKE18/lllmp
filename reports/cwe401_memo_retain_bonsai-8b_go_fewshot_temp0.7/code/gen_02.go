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
	sc.Scan()
	mem := make(map[int]int)
	total := 0
	for {
		n, err := sc.Scan()
		if err != nil {
			if err == bufio.ErrUnexpectedEOF {
				break
			}
			continue
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if n < 0 {
			continue
		}
		if n in mem {
			fmt.Printf("total=%d\n", total)
			return
		}
		mem[n] = 1
		rem := n
		for rem != 1 {
			if rem%2 == 0 {
				rem /= 2
			} else {
				rem = 3*rem + 1
			}
			mem[rem] = 1
		}
		total += mem[n]
	}
	fmt.Printf("total=%d\n", total)
}
