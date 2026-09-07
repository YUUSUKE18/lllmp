package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan() // 1 行目
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("error: invalid input")
		return
	}

	pairs := 0
	for i := 0; i < target; i++ {
		sc.Scan()
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		for j := i + 1; j < target; j++ {
			if num+num == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
