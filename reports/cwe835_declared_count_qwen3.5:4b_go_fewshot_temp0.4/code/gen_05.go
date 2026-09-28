package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countLine, err := sc.Scan()
	if err != nil {
		return
	}
	n := 0
	fmt.Sscanf(countLine, "%d", &n)

	sum := int64(0)
	var found bool
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		i, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		found = true
		sum += i
	}

	fmt.Printf("count=%d sum=%d\n", found, sum)
}
