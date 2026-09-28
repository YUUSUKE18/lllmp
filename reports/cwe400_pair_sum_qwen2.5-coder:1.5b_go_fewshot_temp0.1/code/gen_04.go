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
		fmt.Println("invalid target value")
		return
	}
	pairs := 0
	for i := 0; i < len(sc.Text()); i++ {
		for j := i + 1; j < len(sc.Text()); j++ {
			n1, err := strconv.Atoi(sc.Text()[i:j+1])
			if err != nil {
				continue
			}
			n2, err := strconv.Atoi(sc.Text()[j+1:])
			if err != nil {
				continue
			}
			if n1+n2 == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
