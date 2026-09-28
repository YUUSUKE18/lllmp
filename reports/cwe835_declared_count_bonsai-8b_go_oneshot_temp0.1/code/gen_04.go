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
	countStr := strings.Fields(sc.Text())[0]
	count, _ := strconv.Atoi(countStr)
	sum := 0
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			first = false
			continue
		}
		for _, numStr := range strings.Fields(line) {
			num, _ := strconv.Atoi(numStr)
			sum += num
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
