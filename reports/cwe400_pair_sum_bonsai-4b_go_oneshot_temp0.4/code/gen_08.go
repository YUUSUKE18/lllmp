package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var target int
var pairs int

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := sc.Scan()
		if line == "" {
			break
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if val == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
