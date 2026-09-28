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
	for {
		n, err := sc.ReadRune('\n')
		if err != nil {
			break
		}
		sc.ScanRune('\n')
		if n == 0 {
			break
		}
		sc.Scan()
		if err != nil {
			break
		}
		var num string
		sc.Scan(&num)
		if num == "" {
			continue
		}
		n, err := strconv.Atoi(num)
		if err != nil {
			continue
		}
		if n > 0 {
			count++
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
