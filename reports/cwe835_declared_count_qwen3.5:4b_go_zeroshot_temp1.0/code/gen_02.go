package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var count int
	err := fmt.Fscan(reader, &count)
	if err != nil {
		return
	}

	sum64 := int64(0)

	for i := 0; i < count; i++ {
		var num int64
		line, _ := reader.ReadBytes('\n')
		if len(line) == 0 {
			continue
		}

		val, err := strconv.ParseInt(string(line[:len(line)-1]), 10, 64)
		if err != nil {
			continue
		}
		sum64 += val
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum64)
}
