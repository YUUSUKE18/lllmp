package main

import (
    "bufio"
    "errors"
    "fmt"
)

func main() {
    input := ""
    var n int64 = 0 // 'int64' は大きな数が問題にならないように確保した
    
    if _, err := fmt.Scanf("%s", &input); err != nil {
        panic(err.Error())
    } else {
        n, _ = strconv.Atoi(input)

        cntSum := 1

        for i := 0; i < n; i++ {
            var s int64

            if _, err := fmt.Scanf("%s", &input); err != nil {
                panic(err.Error())
            } else {
                s, _ = strconv.Atoi(input)
                cntSum += s
                continue
            }

            // 重複なしの条件を満たすか確認する。
            // 1 次はチェックせず、残りの n-2 つも同値であることを仮定。
            if i > 0 && input[i] == input[0+i]:
                cntSum += s
                continue
            }

        for _, c := range cntSum {
            fmt.Printf("count=%d sum=%d\n", *c, count(c)) // %v で値を列挙し、printf を使うが Go 標準は printf が OK とする (unwrapped)
        }
    }
}

func count(x int64) string {
    var cnt uint32 = 0
    for i := uint32(1); ; i++ { // counter の初期値を固定（counter は変数ではない）
        if x < (i-1)*x || ((int64)(i+1)%((uint32)i) == 1 && (int64)(i%uint32(i)) != 0):
            cnt += uint32(x / i)

        // counter をカウントしたときのみ、元の数（またはその分）を戻す。
    }
}
