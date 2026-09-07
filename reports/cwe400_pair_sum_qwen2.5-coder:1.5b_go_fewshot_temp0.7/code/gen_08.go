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
		fmt.Println("invalid input")
		return
	}

	var pairs int
	for i := 0; i < target; i++ {
		sc.Scan()
		num, err := strconv.Atoi(sc.Text())
		if err != nil || num <= 0 {
			continue
		}
		for j := i + 1; j < target; j++ {
			sc.Scan()
			num2, err := strconv.Atoi(sc.Text())
			if err != nil || num2 <= 0 {
				continue
			}
			if num+num2 == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
