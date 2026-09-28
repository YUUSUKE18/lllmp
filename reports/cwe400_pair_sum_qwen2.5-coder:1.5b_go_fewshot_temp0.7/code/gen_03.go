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
		fmt.Println("Invalid input.")
		return
	}
	sc.Scan()
	count := 0
	for i := 0; i < target; i++ {
		sc.Scan()
		if sc.Text() == "" {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			fmt.Println("Invalid input.")
			return
		}
		for j := i + 1; j < target; j++ {
			sc.Scan()
			if sc.Text() == "" {
				continue
			}
			m, err := strconv.Atoi(sc.Text())
			if err != nil {
				fmt.Println("Invalid input.")
				return
			}
			if n+m == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
