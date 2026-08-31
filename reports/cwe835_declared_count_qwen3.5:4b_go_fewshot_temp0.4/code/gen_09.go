package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	counts, err := strconv.Atoi(sc.Scan())
	if err != nil || counts < 0 {
		counts = 0
	}
	var sum int64
	lineCount := 0
	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		n, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}
		sum += n
		lineCount++
	}
	fmt.Printf("count=%d sum=%d\n", lineCount, sum)
}
