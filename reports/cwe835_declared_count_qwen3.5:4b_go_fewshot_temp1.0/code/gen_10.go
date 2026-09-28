package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	sumStr := sc.Text()
	line, err := strconv.Atoi(sumStr)
	if err != nil {
		line = 0
	}
	count = line
	sum := int64(0)
	for scanner := bufio.NewScanner(os.Stdin); scanner.Scan(); {
		text := scanner.Text()
		parts := ""
		var n int64
		err := fmt.Sscanf(text, "%d", &n)
		if err == nil {
			sum += n
			count++
		} else {
			continue
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
