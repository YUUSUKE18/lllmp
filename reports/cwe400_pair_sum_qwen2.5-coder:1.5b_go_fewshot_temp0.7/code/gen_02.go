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
		return
	}

	count := 0
	for i := 0; i < 2; i++ {
		sc.Scan()
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if num == target {
			count++
		}
	}

	if count == 2 {
		fmt.Printf("pairs=2\n")
	} else {
		fmt.Printf("pairs=0\n")
	}
}
