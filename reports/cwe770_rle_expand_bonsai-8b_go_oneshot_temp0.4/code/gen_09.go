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
	var count = 0
	var sum = 0
	for _, s := range strings.Fields(sc.Text()) {
		if ':' != s[0] || s[1] == "" {
			continue
		}
		val, err := strconv.Atoi(s[0])
		if err != nil {
			continue
		}
		_, err = strconv.Atoi(s[1])
		if err != nil {
			continue
		}
		count += 1
		sum += val
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
