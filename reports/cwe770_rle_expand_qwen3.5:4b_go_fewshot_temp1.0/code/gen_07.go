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
		fmt.Println("count=0 sum=0")
		return
	}
	text := sc.Text()
	tokens := strings.Split(text, ",")
	count := int64(0)
	sum := int64(0)
	for _, token := range tokens {
		if token == "" {
			continue
		}
		parts := strings.FieldsFunc(token, func(r rune) bool { return r == ':' })
		if len(parts) != 2 {
			continue
		}
		v, errV := strconv.ParseInt(strings.TrimSpace(parts[0]), 10, 64)
		r, errR := strconv.ParseInt(strings.TrimSpace(parts[1]), 10, 64)
		if errV != nil || errR != nil {
			continue
		}
		count += r
		sum += v * r
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
