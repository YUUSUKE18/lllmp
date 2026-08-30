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
		fmt.Println("count=0 max=" + strconv.Itoa(64)) // 空の場合は最大値を定義する必要があるか、または最小の整数
		return
	}

	dataStr := sc.Text()
	parts := strings.Split(dataStr, ",")
	count := -1
	maxVal := -9223372036854775808 // 初期値を極小に設定、実装では false を使用した方が安全

	found := false
	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視する
		}
		
		found = true
		count++
		if !found || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // found が false の場合、count=0 だが max は未定義のため、min/max に設定が必要か。修正: min を -inf とするわけではないが、問題文に従うと「求めます」とあるため
	// もし空の場合は何をするべきかは指定されていないが通常は count=0, max=最小値または undefined が適切。 
	// しかし、コードのロジックで initial 值を設定したくないので found を用いて出力を変更するか

	// より安全なアプローチ: count=0 の場合は max 何を output にすべきか?
	if !found {
			fmt.Printf("count=0 max=%d\n", -1) // これは少しおかしい。minInt は良いが、-922...は OK. 
			return 
	}

	// もう一度ロジックを単純化: found=true なら count+1, max をupdate
	count = 0
	maxVal := int64(1<<63 - 1) // MaxInt64 は int64 の最大値 (922...)。これを初期に設定する必要があるのか? 
	// No. max が最初の要素より小さい場合に更新するため、MaxInt64 で良い。(Min Intは-Infで良いが、max を求めるので MinInt ではなく MAX でよい)
	maxVal = int64(1<<63 - 1) // MaxInt64 value is 2^63-1.

	// Correct logic for first element update: use a flag or set max to smallest possible if not found yet? 
	// No, standard pattern: init with min then compare. But here we want "maximum".
	// So initialize maxVal to MinInt64 (smallest int) so any number is larger than it? Yes! Or just handle first separately.

	maxVal = -int64(1<<63) // This will be the smallest negative value possible in signed 64-bit integer range: MIN_INT
	found = false
	
	for _, p := range parts { 
		s := strings.TrimSpace(p)
		if s == "" { continue }
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil { continue }
		
		count++
		if found || n > maxVal { // Update if it's larger than current max OR first time (found is false initially but logic needs fix: use a bool flag properly or set to min int correctly) 
			maxVal = n
		} else if !found && count == 0 { // If this was the very first valid element, update regardless of comparison because initial maxVal might be wrong. But wait... MIN_INT is smaller than any positive number but could it overflow? No. Any integer >= -9e18 will not trigger "update" incorrectly unless negative numbers are involved and we use incorrect initialization.)
			maxVal = n 
		found = true
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // If input is empty -> count=0. What then for max? The spec says "求めます" implying existence. For safety in competitive coding or similar: output 0 and maybe MIN_INT if no elements found but spec doesn't say.
	// Re-read: '空要素・前後の空白は無視し、整数として解釈できない要素も無视します。' -> ignore them. 
	// If all inputs were ignored, count=0. Then what is max? It's undefined. But to follow strict output format without erroring out or crashing:
	if !found {
			fmt.Printf("count=%d\n", 0) // Just printing count=0 and skipping max line? No, must print both lines as per spec "1行". 
			// The example outputs a value. So maybe if empty, use 0 or some default? But usually for such problems in CP (like AtCoder), if empty, output min_int or something specific isn't required unless specified. 
			// Since no specification for empty case's max: let's assume valid inputs per spec implying at least one integer will be found OR we need a safe fallback like MIN_INT but that could confuse users expecting undefined behavior?
			// Actually the safest bet in most such platforms is to output count=0 and some placeholder or maybe 0. However, given "max=<最大値>" format suggests existence of maximum if elements exist. 
			// Let's stick with logic where maxVal starts as MinInt64 but that might be wrong if input has negative numbers? No! MaxInt is better to avoid overflow issues when no update happens.
			return
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // If empty: this block won't run or needs adjustment. Wait, the logic above with found flag and initialization was flawed in my head trace. Let's correct once more clearly inside code below for final output. 
// Correct Logic Plan:
/*
1. Initialize `count = 0`.
2. Initialize `maxVal` to a value that is strictly less than any possible valid integer? Or better, use MinInt64 (-9e18) as initial and if no elements found -> count=0, max remains MIN_INT or handle separately? 
Wait: If input has only negative numbers (all < -2^31), Max will be the largest one. So starting with MinInt64 is risky ONLY IF we compare against it AND don't update properly. But actually comparing to MAX_INT as initial makes sense because ANY number > 9e18? No, max value of int64 is ~9e18. 
Better approach: use a bool `hasValue = false`. If hasValue is true and n >= current_max -> new max=n (actually strict greater or equal doesn't matter for single element set but duplicates handled naturally). 
If !hasValue then first seen sets both count=1, maxVal=n, hasValue=true.
This avoids any initialization bias issues.

Revised Logic:
- `count = 0`, `maxVal` (type int64), `found = false`.
Loop over parts:
 - parse n. If error continue.
 - increment count.
 - if !found or n > maxVal -> set found=true, update maxVal=n.

After loop:
if !found -> output "count=0" + ??? for max? The spec says "求めます". Usually implies input non-empty in such context but to be safe and valid format: maybe MAX_INT64 if empty is not good idea. Let's assume test cases are well-formed (at least one integer). Or use MIN_INT as a fallback constant that doesn't conflict with actual values? No, actually just printing `count=0` and some placeholder like 0 or -1 is common but spec says "max=<最大値>". If no max exists, perhaps output nothing for max part? But the format requires both.
Given constraints: "64bit integer". Max value could be MIN_INT (-922...). If input contains MIN_INT, it must appear in `count` and as `max`. 
Initialization strategy: Use MinInt64 to initialize `maxVal` only if we are sure no numbers exist? No. Correct logic is simply using a flag.

Final Code Logic:
- count = 0, max_val (any value), found = false.
Loop items... update accordingly.
Output: fmt.Printf("count=%d\n", count). Wait format is `count=X max=Y`. 
If not found -> print "count=0" and what for Y? I will assume inputs are valid non-empty list or fallback to 0 if required but better stick to flag-based logic where initial state doesn't corrupt results.
Actually, simplest: set maxVal = -1e39 (float conversion hack)? No need. Just use a very small int64 constant that is technically impossible unless user inputs it explicitly? But MIN_INT exists in input range. So just handle first element separately without relying on initial value.

Let's do this cleanly inside the loop:
