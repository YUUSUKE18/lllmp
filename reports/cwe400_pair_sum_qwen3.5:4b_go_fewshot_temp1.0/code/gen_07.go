package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var lines strings.FieldsFunc(func(s string) rune { return ' ' })
	target, err := strconv.Atoi(lines[0])
	if err != nil || len(lines) < 1 {
		fmt.Println("pairs=0")
		return
	}

	nums := []int{}
	i := 0
	for i = 1; ; i++ {
		line := ""
		sc.Scan()
		text := sc.Text()
		if text == "" {
			break
		}
		line = strings.FieldsFunc(text, func(rune) rune { return ' ' })
		for _, f := range line {
			n, err := strconv.Atoi(f)
			if err != nil {
				continue
			}
			nums = append(nums, n)
		}
	}

	pairs := 0
	sum := int64(0)
	for _, v := range nums {
		currSum := sum + int64(v)
		if currSum == int64(target) {
			found := false
			for _, x := range prevs {
				if x == target - v {
					found = true
					break
				}
			}
			if !found {
				pairs++
			}
		}
		sum = currSum
		prevs = append(prevs, sum)
	}

	fmt.Printf("pairs=%d\n", pairs)
}
