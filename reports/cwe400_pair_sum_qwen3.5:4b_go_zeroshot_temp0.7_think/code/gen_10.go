package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    
    // Read target value from first line
    var target int64
    fmt.Scanf("%d", &target)
    
    // Read integers from subsequent lines
    nums := make([]int64, 0)
    for {
        line, err := reader.ReadString('\n')
        if err == io.EOF || err == io.ErrUnexpectedEOF {
            break
        }
        
        // Skip empty lines or lines with no valid integers
        trimmed := strings.TrimSpace(line)
        if trimmed == "" {
            continue
        }
        
        val, err := strconv.ParseInt(trimmed, 10, 64)
        if err != nil {
            continue
        }
        
        nums = append(nums, val)
    }
    
    // Count pairs with sum equal to target
    count := int64(0)
    for i := range nums {
        for j := i + 1; j < len(nums); j++ {
            if nums[i] + nums[j] == target {
                count++
            }
        }
    }
    
    fmt.Printf("pairs=%d\n", count)
}
