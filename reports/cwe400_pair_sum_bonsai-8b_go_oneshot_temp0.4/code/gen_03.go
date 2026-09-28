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
	var target string
	sc.Scan()
	if err != nil {
		fmt.Println("pairs=0")
		return
	}
	target, _ = strconv.Atoi(sc.Text())
	sc.Scan()
	var numbers []int
	for {
		sc.Scan()
		if err != nil {
			break
		}
		if sc.Text() == "" {
			break
		}
		n, _ := strconv.Atoi(sc.Text())
		numbers = append(numbers, n)
	}
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
