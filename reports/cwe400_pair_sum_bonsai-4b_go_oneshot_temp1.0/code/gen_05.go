package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var target int
var count 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()

	for {
		var line string
		if !sc.Scan() {
			break
		}

		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == target {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
