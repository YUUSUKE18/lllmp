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
	target := 0
	var numbers []int
	for {
		n, err := sc.Read([]byte(64*1024))
		if err != nil {
			break
		}
		sc.Scan()
		if err != nil {
			break
		}
		var num string
		for i := 0; i < n; i++ {
			num += string(rune(n-i-1))
		}
		if num == "" {
			continue
		}
		if _, err := strconv.Atoi(num); err == nil {
			numbers = append(numbers, int(num))
		}
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
