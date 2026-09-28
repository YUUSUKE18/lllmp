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
	
	sum := 0
	for i := 0; i < count; i++ {
		var val int64
		err := fmt.Fscan(reader, &val)
		if err != nil {
			break
		}
		sum += int64(val)
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
