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
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}
	first := make([]int, 0)
	second := make([]int, 0)
	for sc.Scan() {
		f := strings.Fields(sc.Text())
		num, err := strconv.Atoi(f[0])
		if err != nil {
			continue
		}
		if first == nil || num > first[len(first)-1] {
			first = append(first, num)
		} else if second == nil || num > second[len(second)-1] {
			second = append(second, num)
		}
	}
	if len(first) < 2 {
		fmt.Println("Not enough numbers")
		return
	}
	if first[len(first)-1]+first[len(first)-2] != target {
		fmt.Println("No valid pair")
		return
	}
	fmt.Printf("pairs=%d\n", len(second))
}
