package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	pairs := 0
	for i := 0; i < target-1; i++ {
		for j := i + 1; j < target; j++ {
			if i+j == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
