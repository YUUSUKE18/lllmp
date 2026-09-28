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
	target, err := strconv.ParseInt(sc.Text(), 10, 64)
	if err != nil {
		fmt.Println("invalid target")
		return
	}
	pairs := 0
	sc.Scan()
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == target {
			pairs++
		} else {
			for i := 0; i < pairs; i++ {
				if target+n == target {
					fmt.Println("valid pair")
					return
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
