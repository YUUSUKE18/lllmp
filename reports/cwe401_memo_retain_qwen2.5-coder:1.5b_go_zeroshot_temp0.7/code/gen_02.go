package main

import "fmt"

func main() {
    var total int64
    var memo map[int]int

    for {
        var q int
        fmt.Scan(&q)

        if q == 0 {
            fmt.Println("total=", total)
            return
        }

        if q == 1 {
            total += 0
            continue
        }

        memo = make(map[int]int)
        count := 0
        for q != 1 {
            if _, ok := memo[q]; ok {
                count += memo[q]
                break
            }
            memo[q] = count + 1

            if q%2 == 0 {
                q /= 2
            } else {
                q = 3*q + 1
            }
            count++
        }

        total += count
    }
}
