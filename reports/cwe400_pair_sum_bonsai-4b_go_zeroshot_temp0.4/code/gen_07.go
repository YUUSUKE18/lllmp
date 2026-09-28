package main

import "fmt"

func main() {
    target := int(input())
    pairs := 0

    for i := 1; i <= 1000; i++ {
        line := input()
        if line == "" {
            continue
        }
        if _, err := strconv.Atoi(line); err == nil {
            num := int(line)
            if num >= 0 && num <= target {
                if num == target {
                    pairs++
                } else {
                    if num + target == target {
                        pairs++
                    } else if num > 0 && num < target {
                        if target-num == 0 {
                            pairs++
                        } else if target-num == num {
                            pairs++
                        }
                    }
                }
            }
        }
    }

    fmt.Println("pairs="+fmt.Sprintf("%d", pairs))
}
