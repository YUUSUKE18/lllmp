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
		return
	}

	input := sc.Text()
	counts := make(map[int]int64) // 使用 count と sum を一元的に管理する map に変更せず、重複除外後の一意の要素数を数えるため別の構造が必要。修正：set を用いて一意な整数をカウントし、その和を求める。

	uniqueIntegers := make([]int, 0)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || !isNumericChar(s[0]) { // 文字列が空または数値ではない最初の文字の場合をスキップ (例: "abc", "-5" は OK なので、単純なチェックは不要か。ただし 'a' の場合は Atoi でエラーになるため、Atoi を使えば良い。)
			continue
		}

		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}

		found := false
		for _, v := range uniqueIntegers {
			if v == n {
				found = true
				break
			}
		}
		if !found {
			uniqueIntegers = append(uniqueIntegers, n)
		}
	}

	count := len(uniqueIntegers)
	sum := int64(0)
	for _, v := range uniqueIntegers {
		sum += int64(v)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

// isNumericChar は文字列の最初の文字が数値 (- 含む) なかかどうかを判定する。
func isNumericChar(c byte) bool {
	if c >= '0' && c <= '9' {
		return true
	}
	if c == '-' || c == '+' {
		return false // 次の文字を確認するために戻す必要があるが、Atoi が処理するのでこの関数は単なるガード。実際には Atoi でエラーを出せば良いので削除する方がシンプルか？
	// 修正: isNumericChar は不要。直接 strconv.Atoi を使うと空文字列や非数値のケースは continue で済む。(ただし leading '+' も OK)
	return false 
}

//上面的代码逻辑有误，因为 `isNumericChar` 的实现并不完全正确（它返回false对于 '-'），导致无法解析以负号开头的数字。更简单的做法是直接尝试转换，捕获错误即可。让我重写这个部分，移除不必要的辅助函数并简化循环。

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
		return
	}

	input := sc.Text()
	countsMap := make(map[int]bool) // 用于记录已存在的整数，以去除重复项。实际上我们需要的是唯一的整数列表及其和。
	// 使用一个切片来存储唯一整数值可能效率更高，或者直接用 map<int> bool 来判断是否存在。
	
	var uniqueIntegers []int

	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || !isNumericChar(s[0]) { 
			continue // 跳过空字符串或第一个字符不是数字/符号的项。注意：如果是 "abc"，s[0]是'a'，返回false，continue正确。但如果输入是 "-5"，s[0]是 '-'，需要能识别。
		}

		n, err := strconv.Atoi(s)
		if err != nil {
			continue 
		}

		exists := false
		for _, v := range uniqueIntegers {
			if v == n {
				exists = true
				break
			}
		}
		
		if !exists {
			uniqueIntegers = append(uniqueIntegers, n)
		}
	}

	count := len(uniqueIntegers)
	sum := int64(0)
	for _, v := range uniqueIntegers {
		sum += int64(v)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func isNumericChar(c byte) bool {
	return c >= '0' && c <= '9' || (c == '-' || c == '+') 
}
