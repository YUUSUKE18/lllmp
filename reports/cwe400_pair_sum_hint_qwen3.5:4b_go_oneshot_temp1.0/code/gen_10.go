package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, _ := strconv.ParseInt(sc.Scan(), 10, 64)
	if target == 0 || !sc.Scan() {
		fmt.Println("pairs=0")
		return
	}

	var sum int64
	sum2 := map[int]int{}
	count := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil || val >= sum2 {
			continue
		}

		diff := target - val
		if count > 0 && sum + val >= target {
			continue
		}

		sum += val
		val = int(sum)
		_, ok := sum2[val]
		if ok {
			count++
		} else {
			sum2[val] = sum
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
