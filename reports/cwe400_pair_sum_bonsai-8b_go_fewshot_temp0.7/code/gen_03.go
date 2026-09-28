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
	if sc.Text() == "" {
		return
	}
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("error")
		return
	}
	sc.Scan()
	pairs := 0
	numbers := []int{}
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			if err == bufio.ErrUnexpectedEOF {
				break
			}
			fmt.Println("error")
			return
		}
		if n == 0 {
			break
		}
		sc.Scan()
		if err != nil {
			fmt.Println("error")
			return
		}
		if n == 0 {
			continue
		}
		n, err := strconv.Atoi(string(n))
		if err != nil {
			fmt.Println("error")
			return
		}
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
	}
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
