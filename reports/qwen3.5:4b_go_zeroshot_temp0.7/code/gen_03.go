```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdio)
	var nums []int64
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}
		elements := []rune(line)
		for i := 0; i < len(elements); i++ {
			ch := elements[i]
			if ch == ',' || ch == '\t' || ch == ' ' || ch == '\n' || ch == '\r' || ch == '\f' || ch == '\v' {
				continue
			} else if (ch >= '0' && ch <= '9') || ch == '-' {
				if i > 0 && (elements[i-1] < '0' || elements[i-1] > '9') && ch != '-' {
					break
				}
			} else {
				continue
			}
			substr := string(elements[i:])
			start := 0
			end := len(substr)
			for j := start; j < end; j++ {
				if (substr[j] >= '0' && substr[j] <= '9') || substr[j] == '-' {
					continue
				} else {
					break
				}
			}
			numStr := string(substr[:end-start])
			var n int64
			fmt.Sscanf(numStr, "%d", &n)
			if n != 0 || (numStr == "-0" && n == 0) {
				if numStr != "0" {
					i++
					for ; i < len(elements); i++ {
						if elements[i] == ',' || elements[i] == '\t' || elements[i] == ' ' || elements[i] == '\n' || elements[i] == '\r' || elements[i] == '\f' || elements[i] == '\v' {
							break
						}
					}
				}
			}
		}
		if len(nums) > 0 {
			count := make(map[int64]int)
			sum := int64(0)
			for _, num := range nums {
				count[num]++
				sum += num
			}
			fmt.Printf("count=%d sum=%d\n", len(count), sum)
			return
		}
		nums = append(nums, n)
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
		}
		fmt.Printf("count=%d sum=%d\n", len(count), sum)
		return
	}
	if len(nums) > 0 {
		count := make(map[int64]int)
		sum := int64(0)
		for _, num := range nums {
			count[num]++
			sum += num
