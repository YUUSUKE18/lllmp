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
	sc.Scan()
	pairs := 0
	for _, line := range strings.Split(sc.Text(), "\n") {
		if line == "" {
			continue
		}
		elements := strings.Fields(line)
		if len(elements) < 2 {
			fmt.Println("invalid line format")
			return
		}
		for i := 0; i < len(elements)-1; i++ {
			for j := i + 1; j < len(elements); j++ {
				num1, err1 := strconv.Atoi(elements[i])
				num2, err2 := strconv.Atoi(elements[j])
				if err1 != nil || err2 != nil {
					fmt.Println("invalid number format")
					return
				}
				if num1+num2 == target {
					pairs++
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
