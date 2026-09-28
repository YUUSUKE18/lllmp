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
	sum := 0
	for _, s := range strings.Fields(sc.Text()) {
		if ':' != s[0] {
			continue
		}
		valStr, _ := s[1:].Split(':')
		val, _ := strconv.Atoi(valStr)
		_, _ := strconv.Atoi(s[2:])
		count += 1
		sum += val * 1
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
