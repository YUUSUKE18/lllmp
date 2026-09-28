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
		fmt.Println("pairs=0")
		return
	}
	target := strconv.Atoi(sc.Text())
	sc.Scan()
	pairs := 0
	numPairs := 0
	var nums []int
	for {
		n, err := sc.Read([]byte{64 * 1024})
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if n == 0 {
			continue
		}
		var line []string
		for i := 0; i < n; i++ {
			line = append(line, string(line[i]))
		}
		for i := 0; i < len(line); i++ {
			if strings.TrimSpace(line[i]) != "" {
				nums = append(nums, strconv.Atoi(line[i]))
			}
		}
		if len(nums) >= 2 {
			for i := 0; i < len(nums); i++ {
				for j := i + 1; j < len(nums); j++ {
					if nums[i]+nums[j] == target {
						pairs++
						numPairs++
					}
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
