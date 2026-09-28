package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil)
	var input string
	fmt.Fprintln(reader, "Enter integers separated by commas:")
	input, _ = reader.ReadString('\n')

	input = input[:len(input)-1]
	input = input[0 : len(input)]

	// 空要素・前後の空白は無視し、整数として解釈できない要素も無視します。
	var nums []int64
	for _, s := range input {
		if s == ',' || s == ' ' || s == '\t' || s == '\n' || s == '\r' {
			continue
		}
		val, err := strconv.ParseInt(string(s), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}

	// 重複を除いた整数について、個数と合計を求めます。
	count := len(nums)
	sum := int64(0)
	for _, n := range nums {
		sum += n
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
