package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
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
		if sc.Text()[i] == '\n' {
			continue
		}
		for j := i + 1; j < len(sc.Text()); j++ {
			if sc.Text()[j] == '\n' {
				continue
			}
			n1, err := strconv.Atoi(sc.Text()[i:j])
			if err != nil {
				continue
			}
			n2, err := strconv.Atoi(sc.Text()[j:])
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
