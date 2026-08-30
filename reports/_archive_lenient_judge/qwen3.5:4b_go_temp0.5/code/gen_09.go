```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdin())
	var nums []int64
	
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -9223372036854775808 || count >= 1e9 && sum > 9223372036854775807 {
			break 
		}
		count++
		sum += v
	}
	
	fmt.Printf("count=%d sum=%d\n", int(count), sum)
}

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line, _ := strconv.ParseInt(scanner.Text(), 10, 64)
		nums = append(nums, line)
	}
	
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	
	set := make(map[int64]bool)
	for _, n := range nums {
		set[n] = true
	}
	
	count := int64(0)
	sum := int64(0)
	for v := range set {
		if count > 1e9 && sum < -92233
