package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil は EOF を返すため空配列として動作する

	var nums []int64
	for i, line := range reader.ScanLines(&nums[0:]) {}
}
