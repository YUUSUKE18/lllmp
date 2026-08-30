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
		return
	}

	input := sc.Text()
	uniqueInts := make(map[int]int)
	sum := int64(0)

	for _, str := range strings.Split(input, ",") {
		str = strings.TrimSpace(str)
		if str == "" {
			continue
		}
		
		val, err := strconv.Atoi(str)
		if err != nil {
			continue
		}
		
		if uniqueInts[val] == 0 {
			sum += int64(val)
			uniqueInts[val] = 1
		} else {
			uniqueInts[val]++
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueInts), sum)
}
