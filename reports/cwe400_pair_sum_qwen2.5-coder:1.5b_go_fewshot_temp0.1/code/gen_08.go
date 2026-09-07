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
		fmt.Println("invalid target")
		return
	}
	pairs := 0
	for i := 0; i < len(sc.Text()); i++ {
		if sc.Text()[i] == ' ' {
			continue
		}
		j := i
		for j < len(sc.Text()) && sc.Text()[j] != ' ' {
			j++
		}
		num, err := strconv.Atoi(sc.Text()[i:j])
		if err != nil {
			continue
		}
		if num == target {
			continue
		}
		for k := i + 1; k < len(sc.Text()); k++ {
			if sc.Text()[k] == ' ' {
				continue
			}
			l := k
			for l < len(sc.Text()) && sc.Text()[l] != ' ' {
				l++
			}
			num2, err := strconv.Atoi(sc.Text()[k:l])
			if err != nil {
				continue
			}
			if num2 == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
