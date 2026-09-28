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
	countStr := sc.Text()
	count := 0
	sum := 0
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			count, _ = strconv.Atoi(countStr)
			first = false
		} else {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			sum += n
			count++
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
