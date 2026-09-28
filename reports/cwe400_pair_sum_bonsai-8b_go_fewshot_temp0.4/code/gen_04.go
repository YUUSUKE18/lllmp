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
	target := 0
	var first := true
	pairs := 0
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if first {
			if n == 0 {
				continue
			}
			if _, err := strconv.Atoi(string(n)); err == nil {
				target = target*100 + n
				first = false
			}
		} else {
			if n == 0 {
				continue
			}
			var num int
			if _, err := strconv.Atoi(string(n)); err == nil {
				pairs += countPairs(target, num)
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
