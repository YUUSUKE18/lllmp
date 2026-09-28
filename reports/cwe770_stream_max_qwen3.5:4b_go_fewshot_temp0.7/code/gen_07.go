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

	var count int64 = 0
	maxVal := int64(-9223372036854775808) // INT_MIN
	first := true

	for _, w := range strings.Split(sc.Text(), ",") {
		w = strings.TrimSpace(w)
		if w == "" {
			continue
		}

		n, err := strconv.ParseInt(w, 10, 64)
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
