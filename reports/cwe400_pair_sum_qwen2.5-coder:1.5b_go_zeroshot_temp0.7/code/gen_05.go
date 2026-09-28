package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	target, err := reader.ReadInt64()
	if err != nil {
		fmt.Println("入力に問題が発生しました:", err)
		return
	}

	var pairs int
	for i := 0; i < 1000000; i++ {
		num, err := reader.ReadInt64()
		if err != nil {
			break
		}
		for j := i + 1; j < 1000000; j++ {
			if num+num == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
