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
	line := sc.Text()

	var count, sum int64
	parts := strings.Split(line, ",")

	for _, p := range parts {
		p = strings.TrimSpace(p)
		if len(p) == 0 {
			continue
		}
		colons := strings.Split(p, ":")
		if len(colons) != 2 {
			continue
		}
		v, err1 := strconv.ParseInt(strings.TrimSpace(colons[0]), 10, 64)
		r, err2 := strconv.ParseInt(strings.TrimSpace(colons[1]), 10, 64)
		if err1 != nil || err2 != nil {
			continue
		}
		if v < 0 || r < 0 {
			continue
		}
		count += r
		sum += v * r
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
