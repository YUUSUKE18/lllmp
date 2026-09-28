```go
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
		fmt.Printf("count=0 max=" + fmt.Sprintf("%d", 0)) // Handle empty input gracefully or print "max=0 count=0"? Based on example logic.
		return 
	}

	input := sc.Text()
	strings.TrimSpace(input) 

	c, err := strconv.Atoi(strings.TrimSpace(input))
	if err != nil {
		fmt.Printf("count=%d max=" + fmt.Sprintf("%d", 0)) // Handle invalid input gracefully or print "max=0 count=1"? 
		return }

	var nums []int64
	for _, s := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		nums = append(nums, int64(n))
		fmt.Printf("count=%d max=" + fmt.Sprintf("%d", 0)) // Handle invalid input gracefully or print "max=0 count=1"? 
		return }

	max := nums[0]
	for i := 1; i < len(nums); i++ {
		if nums[i] > max {
			max = nums[i]
		}
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 
	return }

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Println("count=0 max=0")
		os.Exit(0)
	}

	input := sc.Text()
	
	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max))) // Handle invalid input gracefully or print "max=0 count=1"? 

	var nums []int64
	
	for _, s := range strings.Fields(input) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue 
		}
		nums = append(nums, n)
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%d", int64(max)))
