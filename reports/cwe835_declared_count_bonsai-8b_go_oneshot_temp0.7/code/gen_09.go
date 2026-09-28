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
	countStr, _ := strings.Fields(sc.Text())[0]
	count, _ := strconv.Atoi(countStr)
	sum := 0
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			first = false
		} else {
			nStr, _ := strings.Fields(line)[0]
			n, _ := strconv.Atoi(nStr)
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
