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
	var count, sum int
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			_, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			count = 0
			sum = 0
			first = false
		} else {
			_, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			count++
			sum += err.Error()
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
