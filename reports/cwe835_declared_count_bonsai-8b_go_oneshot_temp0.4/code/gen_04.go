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
			continue
		}
		_, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		sum += _
		first = false
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
