package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countLine, _ := sc.Scan()
	if countLine == 0 {
		return
	}

	var n int
	fmt.Sscanf(countLine.(string), "%d", &n)

	sum := int64(0)
	foundCount := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		token, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += token
		foundCount++
	}

	fmt.Printf("count=%d sum=%d\n", foundCount, sum)
}
