package main

import "fmt"

func main() {
    target := int(os.Stdin.readline().String())
    values := []int{}
    
    for i := 0; i < os.Stdin.Countstdin; i++ {
        line := os.Stdin.ReadLine()
        if line == "" {
            continue
        }
        if line == "" {
            continue
        }
        val := int(line.String())
        if val >= 0 && val <= 1000000000000000000 {
            values = append(values, val)
        }
    }
    
    count := 0
    n := len(values)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if values[i]+values[j] == target {
                count++
            }
        }
    }
    
    fmt.Printf("pairs=%d\n", count)
}
