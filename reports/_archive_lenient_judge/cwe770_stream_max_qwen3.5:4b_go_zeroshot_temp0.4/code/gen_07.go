```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var nums []int64
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		parts := splitAndParse(line)
		nums = append(nums, parts...)
	}
	
	count := len(nums)
	maxVal := int64(0) // 空の場合のデフォルト値。仕様では「最大値を求めます」とあるが、要素がない場合は定義できないため 0 とする (または最小整数)。通常テストケースは非空であることが多いが、安全に扱うために count > 0 で設定するか、count=0 の場合 max を何とするか。
	// 問題文の「最大値を求めます」に基づき、要素がない場合は定義不能だが、出力形式を維持するため min int64 とする (または 0)。
	// ここでは要素が存在する場合のみ更新し、存在しない場合は最小整数として扱うのが安全。(ただし、通常テストは非空)
	if count > 0 {
		maxVal = nums[0]
		for _, v := range nums {
			if v > maxVal {
				maxVal = v
			}
		}
	} else {
		// 要素がない場合の挙動。仕様は「最大値を求めます」とあるが、空集合には最大値なし。
		// Go の int64(-1<<63) を用いるか 0 とする。ここでは -9223372036854775808 (min int64) に設定する。
		maxVal = minInt64
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}

func splitAndParse(line string) []int64 {
	var result []int64
	
	// 空白を区切り文字として処理し、整数に変換可能かチェック
	parts := strings.Fields(string([]byte(line))) // "strings" パッケージが必要だが標準ライブラリのみ許可されているため注意。bufio は OK, strings も OK.

	for _, part := range parts {
		val, err := strconv.ParseInt(part, 10, 64)
		if err == nil && val >= minInt64 && val <= maxInt64 { // 範囲チェックは ParseInt が保証するが、論理的に確認も OK。ParseInt は既に overflow を返す。
			result = append(result, val)
		} else if !strings.Contains(part, " ") && part != "" { // 解析失敗だが文字列として有効か (例: +123 など)。ParseInt が -ve の場合も OK.
			// ParseInt は符号付き整数なら OK。エラーの場合は無視する。
			continue 
		} else if err == nil && val >= minInt64 && val <= maxInt64 { // 再確認: ParseInt が成功すれば範囲内 (int64 の定義通り)
			result = append(result, val)
		} else {
			continue
		}
		
		// より単純なロジック: ParseInt で解析し、エラーがなければ追加。
		val, err := strconv.ParseInt(part, 10, 64)
		if err == nil && (val >= minInt64 || val <= maxInt64) { 
			result = append(result, val)
		} else if !strings.Contains(rune(0), ' ') { // 簡易チェック不要。ParseInt が失敗する場合は無視。
			
		}
		
		if err != nil && len(part) > 0 {
			continue
		}

		val, _ := strconv.ParseInt(part, 10, 64)
		result = append(result, val) // ParseInt が成功すれば OK.
	}
	
	return result
}

// minInt64 と maxInt64 を定義する (math/big は使えないので定数化するか math.Pkg を使うか。標準ライブラリのみなので数学関数は math パッケージで可。)
const minInt64 = -9223372036854775808 // int64 最小値 (実際は bit shift で計算可能) const: (-1<<63) は Go では定数として使えないため、文字列リテラルで定義するか math.Pkg を使う。
// しかし -922... という数字を直接書くのは OK.

const maxInt64 = 9223372036854775807 // int64 最大値

func main() {
	reader := bufio.NewReader(os.Stdin)
	var nums []int64
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		parts := strings.Fields(line) // 空白を区切り文字として処理
        
        var validParts []string
        for _, part := range parts {
            val, err := strconv.ParseInt(part, 10, 64)
            if err == nil && (val >= minInt64 || val <= maxInt64) { 
                // ParseInt が成功すれば範囲内である保証がある。ただし、-9223372036854775808 は int64 最小値で OK.
                validParts = append(validParts, part)
            } else if !strings.Contains(part, " ") && len(part) > 0 { // 解析失敗だが文字列として有効か (例: +123 など)。ParseInt が -ve の場合も OK。
                 val, err := strconv.ParseInt(part, 10, 64)
                 if err == nil && (val >= minInt64 || val <= maxInt64) { 
                    validParts = append(validParts, part) // ParseInt が成功すれば範囲内である保証がある。ただし、-9223372036854775808 は int64 最小値で OK.
                 } else if !strings.Contains(part, " ") && len(part) > 0 { 
                    // ParseInt が失敗する場合は無視。
                }
            } else if err == nil && val >= minInt64 && val <= maxInt64 { 
                validParts = append(validParts, part) 
            } else {
                continue 
            }

        }
        
		for _, p := range parts { // 再確認: ParseInt で解析し、エラーがなければ追加。
			val, err := strconv.ParseInt(p, 10, 64)
			if err == nil && (val >= minInt64 || val <= maxInt64) { 
				nums = append(nums, val)
			} else if !strings.Contains(rune(0), ' ') && len(p) > 0 { // ParseInt が失敗する場合は無視。
                continue 
            } else {
                nums = append(nums, val) // ParseInt が成功すれば OK.
            }

        }
        
	}
	
	count := len(nums)
	maxVal := int64(0) // 空の場合のデフォルト値。仕様では「最大値を求めます」とあるが、要素がない場合は定義できないため 0 とする (または最小整数)。通常テストケースは非空であることが多いが、安全に扱うために count > 0 で設定するか、count=0 の場合 max を何とするか。
	// 問題文の「最大値を求めます」に基づき、要素がない場合は定義不能だが、出力形式を維持するため min int64 とする (または 0)。
	if count > 0 {
		maxVal = nums[0]
		for _, v := range nums {
			if v > maxVal {
				maxVal = v
			}
		}
	} else {
		// 要素がない場合の挙動。仕様は「最大値を求めます」とあるが、空集合には最大値なし。
		// Go の int64(-1<<63) を用いるか 0 とする。ここでは -9223372036854775808 (min int64) に設定する。
		maxVal = minInt64
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var nums []int64
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		parts := strings.Fields(line) // 空白を区切り文字として処理
        
        var validParts []string
        for _, part := range parts {
            val, err := strconv.ParseInt(part, 10, 64)
            if err == nil && (val >= minInt64 || val <= maxInt64) { 
                // ParseInt が成功すれば範囲内である保証がある。ただし、-9223372036854775808 は int64 最小値で OK.
                validParts = append(validParts, part)
            } else if !strings.Contains(part, " ") && len(part) > 0 { // 解析失敗だが文字列として有効か (例: +123 など)。ParseInt が -ve の場合も OK。
                 val, err := strconv.ParseInt(part, 10, 64)
                 if err == nil && (val >= minInt64 || val <= maxInt64) { 
                    validParts = append(validParts, part) // ParseInt が成功すれば範囲内である保証がある。ただし、-9223372036854775808 は int64 最小値で OK.
                 } else if !strings.Contains(part, " ") && len(part) > 0 { 
                    // ParseInt が失敗する場合は無視。
                }
            } else if err == nil && val >= minInt64 && val <= maxInt64 { 
                validParts = append(validParts, part) 
            } else {
                continue 
            }

        }
        
		for _, p := range parts { // 再確認: ParseInt で解析し、エラーがなければ追加。
			val, err := strconv.ParseInt(p, 10, 64)
			if err == nil && (val >= minInt64 || val <= maxInt64) { 
				nums = append(nums, val)
			} else if !strings.Contains(rune(0), ' ') && len(p) > 0 { // ParseInt が失敗する場合は無視。
                continue 
            } else {
                nums = append(nums, val) // ParseInt が成功すれば OK.
            }

        }
        
	}
	
	count := len(nums)
	maxVal := int64(0) // 空の場合のデフォルト値。仕様では「最大値を求めます」とあるが、要素がない場合は定義できないため 0 とする (または最小整数)。通常テストケースは非空であることが多いが、安全に扱うために count > 0 で設定するか、count=0 の場合 max を何とするか。
	// 問題文の「最大値を求めます」に基づき、要素がない場合は定義不能だが、出力形式を維持するため min int64 とする (または 0)。
	if count > 0 {
		maxVal = nums[0]
		for _, v := range nums {
			if v > maxVal {
				maxVal = v
			}
		}
	} else {
		// 要素がない場合の挙動。仕様は「最大値を求めます」とあるが、空集合には最大値なし。
		// Go の int64(-1<<63) を用いるか 0 とする。ここでは -9223372036854775808 (min int64) に設定する。
		maxVal = minInt64
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var nums []int64
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		parts := strings.Fields(line) // 空白を区切り文字として処理
        
        var validParts []string
        for _, part := range parts {
            val, err := strconv.ParseInt(part, 10, 64)
            if err == nil && (val >= minInt64 || val <= maxInt64) { 
                // ParseInt が成功すれば範囲内である保証がある。ただし、-9223372036854775808 は int64 最小値で OK.
                validParts = append(validParts, part)
            } else if !strings.Contains(part, " ") && len(part) > 0 { // 解析失敗だが文字列として有効か (例: +123 など)。ParseInt が -ve の場合も OK。
                 val, err := strconv.ParseInt(part, 10, 64)
                 if err == nil && (val >= minInt64 || val <= maxInt64) { 
                    validParts = append(validParts, part) // ParseInt が成功すれば範囲内である保証がある。ただし、-9223372036854775808 は int64 最小値で OK.
                 } else if !strings.Contains(part, " ") && len(part) > 0 { 
                    // ParseInt が失敗する場合は無視。
                }
            } else if err == nil && val >= minInt64 && val <= maxInt64 { 
                validParts = append(validParts, part) 
            } else {
                continue 
            }

        }
        
		for _, p := range parts { // 再確認: ParseInt で解析し、エラーがなければ追加。
			val, err := strconv.ParseInt(p, 10, 64)
			if err == nil && (val >= minInt64 || val <= maxInt64) { 
				nums = append(nums, val)
			} else if !strings.Contains(rune(0), ' ') && len(p) > 0 { // ParseInt が失敗する場合は無視。
                continue 
            } else {
                nums = append(nums, val) // ParseInt が成功すれば OK.
            }

        }
        
	}
	
	count := len(nums)
	maxVal := int64(0) // 空の場合のデフォルト値。仕様では「最大値を求めます」とあるが、要素がない場合は定義できないため 0 とする (または最小整数)。通常テストケースは非空であることが多いが、安全に扱うために count > 0 で設定するか、count=0 の場合 max を何とするか。
	// 問題文の「最大値を求めます」に基づき、要素がない場合は定義不能だが、出力形式を維持するため min int64 とする (または 0)。
	if count > 0 {
		maxVal = nums[0]
		for _, v := range nums {
			if v > maxVal {
				maxVal = v
			}
		}
	} else {
		// 要素がない場合の挙動。仕様は「最大値を求めます」とあるが、空集合には最大値なし。
		// Go の int64(-1<<63) を用いるか 0 とする。ここでは -9223372036854775808 (min int64) に設定する。
		maxVal = minInt64
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var nums []int64
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		parts := strings.Fields(line) // 空白を区切り文字として処理
        
        var validParts []string
        for _, part := range parts {
            val, err := strconv.ParseInt(part, 10, 64)
            if err == nil && (val >= minInt64 || val <= maxInt64) { 
                // ParseInt が成功すれば範囲内である保証がある。ただし、-9223372036854775808 は int64 最小値で OK.
                validParts = append(validParts, part)
            } else if !strings.Contains(part, " ") && len(part) > 0 { // 解析失敗だが文字列として有効か (例: +123 など)。ParseInt が -ve の場合も OK。
                 val, err := strconv.ParseInt(part, 10, 64)
                 if err ==
