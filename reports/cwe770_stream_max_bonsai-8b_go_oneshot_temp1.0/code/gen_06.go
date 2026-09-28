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
	var count int
	var max int64
	first := true
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > max {
			count++
			max = n
			first = false
		}
	}
	fmt.Printf("count=%d max=%d\n", count, max)
}
