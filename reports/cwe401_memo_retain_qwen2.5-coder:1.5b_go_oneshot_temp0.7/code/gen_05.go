package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var memo map[int]int
	var total int
	for sc.Scan() {
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if memo == nil {
			memo = make(map[int]int)
		}
		if val, ok := memo[num]; ok {
			fmt.Printf("total=%d\n", total+val)
			continue
		}
		if num == 1 {
			fmt.Printf("total=0\n")
			break
		}
		if num%2 == 0 {
			num /= 2
		} else {
			num = 3*num + 1
		}
		total++
		memo[num] = total
	}
}
