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
		if ':' == s[0] && s[1] != ':' {
			parts := strings.SplitN(s, ":", 2)
			if len(parts) < 2 {
				continue
			}
			value, err := strconv.Atoi(parts[0])
			if err != nil {
				continue
			}
			_, err = strconv.Atoi(parts[1])
			if err != nil {
				continue
			}
			if value < 0 {
				continue
			}
			count += value
			sum += value * value
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
