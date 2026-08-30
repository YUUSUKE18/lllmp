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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}
	counts := strings.Fields(sc.Text())
	var count int = 0
	maxVal := -9223372036854775808 // Smallest int64 value

	for _, str := range counts {
		n, err := strconv.ParseInt(str, 10, 64)
		if err != nil || n < maxVal {
			continue
		} else if count == 0 && !n.IsNaN() {
			maxVal = n
			count++
		}
	}

	fmt.Printf("count=%d\n", count + 1)
}
