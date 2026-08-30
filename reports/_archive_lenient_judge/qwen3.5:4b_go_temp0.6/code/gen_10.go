```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdin{})
	if !scanner.Scan() {
		return
	}

	line := scanner.Text()
	var nums []int64
	for _, token := range splitIntegers(line) {
		nums = append(nums, token)
	}

	set := make(map[int64]struct{})
	sum := int64(0)
	count := 0
	for _, n := range nums {
		if _, exists := set[n]; !exists {
			set[n] = struct{}{}
			sum += n
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func splitIntegers(line string) []int64 {
	var result []int64
	for len(line) > 0 {
		line = trimSpace(line)
		if line == "" {
			continue
		}
		end := -1
		for i, r := range line {
			if isDigit(r) || r == '-' {
				break
			} else if end != -1 && (r < '0' || r > '9') {
				result = append(result, parseInt(line[:end+1]))
				end = -1
			} else {
				if i == 0 || isDigit(r) {
					break
				}
			}
		}
		if end != -1 && line[end] >= '0' && line[end] <= '9' {
			result = append(result, parseInt(line[:end+1]))
		} else if len(line) > 0 {
			for i := range line {
				r := rune(line[i])
				if r == '-' || (r >= '0' && r <= '9') {
					break
				}
			}
		}

		i := -1
		end = len(line) + 1
		for j, c := range line {
			if isDigit(c) || c == '-' {
				j++
			} else if c < '0' && c > '-9' {
				break
			}
		}

		i = -1
	end = len(line) + 1
	for j, r := range line {
		if isDigit(r) || r == '-' {
			j++
		} else if i != -1 && (r < '0' || r > '9') {
			result = append(result, parseInt(line[i:j]))
			i = j + 1
		}

		for k := range line[j:] {
			r2 := rune(line[k])
			if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
				break
			} else if i != -1 && (r < '0' || r > '9') {
				result = append(result, parseInt(line[i:j]))
				i = j + 1
			}

		for k := range line[j:] {
			r2 := rune(line[k])
			if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
				break
			} else if i != -1 && (r < '0' || r > '9') {
				result = append(result, parseInt(line[i:j]))
				i = j + 1
			}

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
	result = append(result, parseInt(line[i:j]))
	i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
	result = append(result, parseInt(line[i:j]))
	i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
	result = append(result, parseInt(line[i:j]))
	i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
	result = append(result, parseInt(line[i:j]))
	i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' && r2 <= '9') {
	break
	} else if i != -1 && (r < '0' || r > '9') {
result = append(result, parseInt(line[i:j]))
i = j + 1

	for k := range line[j:] {
	r2 := rune(line[k])
	if isDigit(r2) || (r2 >= '0' &&
