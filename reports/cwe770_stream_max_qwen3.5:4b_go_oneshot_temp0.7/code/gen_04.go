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
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}
	text := sc.Text()
	fields := strings.Split(text, ",")
	count := 0
	maxVal := int64(-9223372036854775808)
	first := true

	for _, f := range fields {
		f = strings.TrimSpace(f)
		if len(strings.TrimLeftFunc(f, func(r rune) bool { return r <= ' ' }) == "" && count > 0 {
			continue
		}
		strVal := strings.SplitN(f, ",", -1)[0] // Ensure we don't go deeper than needed just in case of nested commas (though spec implies simple CSV)
		
		n, err := strconv.ParseInt(strVal, 10, 64)
		if err != nil {
			continue
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
