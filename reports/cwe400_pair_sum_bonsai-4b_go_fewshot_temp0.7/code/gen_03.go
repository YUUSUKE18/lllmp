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
	target := 0
	count := 0
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		_, err = strconv.Atoi(string(n))
		if err != nil {
			continue
		}
		if target == 0 || target == n {
			target += n
			if target == 0 {
				target = n
			}
		}
		if target == 0 {
			count++
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
