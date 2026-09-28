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
		n, err := sc.Read([]byte(1 << 30))
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		var num int64
		if err := strconv.ParseInt(string(n), 64, 64); err == nil {
			num, _ = strconv.Int64ToInt(num)
			numbers = append(numbers, num)
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
