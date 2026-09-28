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
	count := 0
	max := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n == 0 {
			continue
		}
		if count == 0 || n > max {
			max = n
			count = 1
		} else {
			count++
		}
	}
	fmt.Printf("count=%d max=%d\n", count, max)
}
