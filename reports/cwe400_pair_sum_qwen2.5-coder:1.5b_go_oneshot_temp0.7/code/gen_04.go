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
		fmt.Println("Invalid input")
		return
	}
	pairs := 0
	for i := 0; i < target; i++ {
		sc.Scan()
		if sc.Text() == "" {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		for j := i + 1; j < target; j++ {
			if j == i {
				continue
			}
			m, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			if n+m == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
