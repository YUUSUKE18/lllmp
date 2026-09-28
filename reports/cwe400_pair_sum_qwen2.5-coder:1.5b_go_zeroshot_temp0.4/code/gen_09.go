package main

import (
	"fmt"
	"strconv"
)

func main() {
	var target int
	fmt.Scan(&target)

	var pairs int
	for i := 0; i < len(os.Args)-2; i++ {
		num, err := strconv.Atoi(os.Args[i+2])
		if err != nil {
			continue
		}
		for j := i + 1; j < len(os.Args)-2; j++ {
			num2, err := strconv.Atoi(os.Args[j+2])
			if err != nil {
				continue
			}
			if num+num2 == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
