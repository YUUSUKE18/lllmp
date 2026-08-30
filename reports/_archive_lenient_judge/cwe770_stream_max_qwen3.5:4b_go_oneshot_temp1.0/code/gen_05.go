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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	text := sc.Text()
	count := 0
	maxVal := int64(-1 << 62 - 1) // Go の最小値より小さい初期値（実際には最初の有効要素で更新される）
	hasValue := false

	for _, s := range strings.Fields(text) {
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		count++
		if !hasValue || n > maxVal {
			maxVal = n
			hasValue = true
		}
	}

	if hasValue && count == 0 {
		fmt.Printf("count=1 max=%d\n", maxVal)
		return
	} else if count != 0 {
		fmt.Printf("count=%d max=" + strconv.FormatInt(maxVal, 10) + "\n", count)
	} else {
		fmt.Printf("count=0 max=-9223372036854775808\n") // -LLONG_MAX (実際には有効要素がない場合のデフォルト値を考慮したロジックですが、仕様では「最大値」を求めるため無効な場合は最小か？例1はmax=0でしたがここでは整数範囲なので初期化が重要)
	}

	// 再考: maxVal の初期値と hasValue の挙動を修正
	if !hasValue {
		fmt.Printf("count=0 max=-9223372036854775808\n") // -INT_MAX_MIN (Goの最小整数は -9223372036854775808)
		return
	}

	fmt.Printf("count=%d max=" + strconv.FormatInt(maxVal, 10) + "\n", count)
}
