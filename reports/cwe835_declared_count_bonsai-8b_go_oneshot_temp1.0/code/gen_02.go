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
	count := 0
	sum := 0
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			count = n
			first = false
		} else {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
