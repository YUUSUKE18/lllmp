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
	max := 0
	count := 0
	sum := 0
	first := true
	for {
		n, err := sc.ReadRune()
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		if first || fmt.Sscanf(string(n), "%d") != 1 {
			continue
		}
		var num int64
		if err := fmt.Sscanf(string(n), "%d"; err != nil) {
			continue
		}
		num = int64(num)
		if num > max {
			max = num
		}
		count++
		sum += num
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
