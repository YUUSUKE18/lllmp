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

	var count int64
	var total int64

	parts := strings.Split(input, ",")
	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		f := strings.SplitN(s, ":", 2)
		if len(f) != 2 {
			continue
		}
		v, err := strconv.ParseInt(f[0], 10, 64)
		if err != nil {
			continue
		}
		c, err := strconv.ParseInt(f[1], 10, 64)
		if err != nil || c < 0 {
			continue
		}
		count += c
		total += v * c
	}

	fmt.Printf("count=%d sum=%d\n", count, total)
}
