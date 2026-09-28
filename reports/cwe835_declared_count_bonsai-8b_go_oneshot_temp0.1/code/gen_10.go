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
	countStr, _ := strings.Fields(sc.Text())
	count, _ := strconv.Atoi(countStr)
	sum := 0
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first || n > sum {
			sum = n
			first = false
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
