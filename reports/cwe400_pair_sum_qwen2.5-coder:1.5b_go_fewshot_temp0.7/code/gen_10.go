package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 64*1024)
	target, err := strconv.Atoi(r.ReadString('\n'))
	if err != nil {
		fmt.Println("error: invalid target value")
		return
	}

	var pairs int
	for i := 0; i < target; i++ {
		n, err := strconv.Atoi(r.ReadString('\n'))
		if err != nil {
			fmt.Println("error: invalid number")
			return
		}
		for j := i + 1; j < target; j++ {
			m, err := strconv.Atoi(r.ReadString('\n'))
			if err != nil {
				fmt.Println("error: invalid number")
				return
			}
			if n+m == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
