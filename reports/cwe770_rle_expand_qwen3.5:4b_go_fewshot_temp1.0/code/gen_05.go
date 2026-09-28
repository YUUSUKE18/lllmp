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

	line := sc.Text()
	parts := strings.Split(line, ",")
	count := int64(0)
	sum := int64(0)

	for _, part := range parts {
		parts = strings.FieldsFunc(part, func(r rune) bool { return r == ':' || r == ' ' })
		if len(parts) != 2 {
			continue
		}
		v, err1 := strconv.ParseInt(parts[0], 10, 64)
		r, err2 := strconv.Atoi(parts[1])
		if err1 != nil || err2 != nil {
			continue
		}
		count += r
		sum += v * int64(r)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
