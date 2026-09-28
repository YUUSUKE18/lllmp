package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var target int
	fmt.Scan(&target)

	var pairs int
	for i := 0; i < len(os.Args)-2; i++ {
		val, err := strconv.Atoi(os.Args[i+2])
		if err != nil {
			continue
		}
		if val == target {
			pairs++
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
