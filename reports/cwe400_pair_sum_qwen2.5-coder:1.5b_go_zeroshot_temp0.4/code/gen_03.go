package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	target, err := strconv.Atoi(os.Args[1])
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}

	var pairs int
	for i := 0; i < len(os.Args) - 2; i++ {
		for j := i + 1; j < len(os.Args) - 1; j++ {
			if _, err := strconv.Atoi(os.Args[i+2]); err != nil {
				continue
			}
			if _, err := strconv.Atoi(os.Args[j+2]); err != nil {
				continue
			}
			if sum, err := strconv.Atoi(os.Args[i+2]); err == nil && sum+strconv.Atoi(os.Args[j+2]) == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
