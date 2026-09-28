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
	var count = 0
	var sum = 0
	first := true
	for _, s := range strings.Fields(sc.Text()) {
		if ':' in s {
			parts := strings.SplitN(s, ':', 2)
			if len(parts) == 2 {
				val, _ := strconv.Atoi(parts[0])
				_, err := strconv.Atoi(parts[1])
				if err != nil {
					continue
				}
				if first || val > max {
					max = val
					count = 0
					sum = 0
					first = false
				}
				count += 1
				sum += val
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
