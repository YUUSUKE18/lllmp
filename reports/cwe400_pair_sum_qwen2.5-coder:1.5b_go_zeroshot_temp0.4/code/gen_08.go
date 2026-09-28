package main

import (
	"fmt"
	"os"
)

func main() {
	var target int64
	fmt.Scan(&target)

	var pairs int64 = 0
	var seen int64 = 0

	for i := 0; i < len(os.Args)-2; i++ {
		num, err := strconv.ParseInt(os.Args[i+2], 10, 64)
		if err != nil {
			continue
		}

		if seen == target-num {
			pairs++
		} else {
			seen = target - num
		}
	}

	fmt.Println(fmt.Sprintf("pairs=%d", pairs))
}
