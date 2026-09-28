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
		fmt.Println("Error: Invalid target value.")
		return
	}

	pairs := 0
	for i := 0; i < len(sc.Text()); i++ {
		for j := i + 1; j < len(sc.Text()); j++ {
			num1, err := strconv.Atoi(sc.Text()[i:j+1])
			if err != nil {
				continue
			}
			num2, err := strconv.Atoi(sc.Text()[j+1:])
			if err != nil {
				continue
			}
			if num1+num2 == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
