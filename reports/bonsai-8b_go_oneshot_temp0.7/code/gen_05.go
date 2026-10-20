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
	nums := make(map[int]bool)
	count := 0
	sum := 0
	for _, s := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		if !nums[n] {
			nums[n] = true
			count++
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
