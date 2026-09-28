package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	countStr := strings.TrimSpace(os.Args[1])
	sumStr := "0"
	integers := []int{}

	if len(countStr) > 0 {
		count, err := strconv.Atoi(countStr)
		if err == nil {
			countStr = ""
		}
	}

	for i := 2; len(os.Args) > i; i++ {
		line := strings.TrimSpace(os.Args[i])
		if line != "" {
			num, err := strconv.Atoi(line)
			if err == nil {
				integers = append(integers, num)
				sumStr = strconv.FormatInt(int64(sumStr), 10) + strconv.Itoa(num)
			}
		}
	}

	if len(integers) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	if len(integers) > 0 {
		fmt.Println("count=" + countStr + " sum=" + sumStr)
	} else {
		fmt.Println("count=0 sum=0")
	}
}
