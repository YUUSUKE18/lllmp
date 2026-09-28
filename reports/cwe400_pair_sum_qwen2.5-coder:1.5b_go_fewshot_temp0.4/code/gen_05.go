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
		fmt.Println("Invalid input")
		return
	}
	var pairs int
	for i := 0; i < 2*target-1; i++ {
		sc.Scan()
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		pairs += num
	}
	fmt.Printf("pairs=%d\n", pairs)
}
