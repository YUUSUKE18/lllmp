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
	if !sc.Scan() {
		return
	}
	input := sc.Text()
	parts := strings.Split(input, ",")
	count := int64(0)
	sum := int64(0)
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		f := strings.SplitN(p, ":", 2)
		if len(f) != 2 {
			continue
		}
		v, err := strconv.ParseInt(strings.TrimSpace(f[0]), 10, 64)
		if err != nil {
			continue
		}
		r, err := strconv.ParseInt(strings.TrimSpace(f[1]), 10, 64)
		if err != nil || r < 0 {
			continue
		}
		count += r
		sum += v * r
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
