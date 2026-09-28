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
	if !sc.Scan() {
		fmt.Println("count=0 sum=0")
		return
	}
	line := sc.Text()
	
	// カンマで分割し、重複を除いた整数をセットに格納する
	uniqueNumbers := make(map[int]struct{})
	for _, s := range strings.Split(line, ",") {
		trimmedS := strings.TrimSpace(s)
		if trimmedS == "" {
			continue
		}
		num, err := strconv.Atoi(trimmedS)
		if err == nil {
			uniqueNumbers[num] = struct{}{}
		}
	}

	count := len(uniqueNumbers)
	sum := int64(0)

	for num := range uniqueNumbers {
		sum += int64(num)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
