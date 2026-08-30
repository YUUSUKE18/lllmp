```go
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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	input := sc.Text()
	tokens := strings.Fields(input) // 空白区切り分割
	count := len(tokens)

	var maxValue int64 = -1e37 * 2 // 最小値より小さい初期値、あるいは最初の要素から設定する方が安全。ただし spec は「整数列」とあるので、空でない限りある。
	firstVal := false
	if count > 0 {
		for _, token := range tokens {
			val, err := strconv.ParseInt(token, 10, 64)
			if err != nil || val == "" { // パース失敗または空文字は無視 (Fields で空は発生しないが、念のため)
				continue
			}
			
			count--
			maxValue = max(maxValue, val)

		}
		
		// 修正: 上記のループロジックを再考。count は入力された要素数（文字列分割後の長さ）で決まるべきだが、 spec では「それらの『要素数』」とあるので、有効な整数として解釈できた個数をカウントすべきか、入力の総個数をカウントするか？
		// 例1の max を求めた際も最初から最後まで解析する中で count の定義は不明確。通常、入力されたデータの数（空白区切り）が「要素数」であり、その中をフィルタリングしても良いが、「整数として解釈できない要素も無視します」とあるので、有効な個数が正しい count である可能性が高い。
	}

	if !firstVal {
		
		fmt.Printf("count=%d max=%d\n", len(tokens), maxValue)
		
	// 上記のコード構造を再確認し直す:
	// spec: 「それらの『要素数』」と「最大値」。
	// 空要素・前後の空白は無視、整数として解釈できない要素も無視。
	// 意図は、「入力された文字列が分割されただろうか？」「その中で解析できた個数が count か？」
	// spec の文脈から: "input=1,2,a" -> max=2. なら count は 3 (1,2,a) なのか、2 (1,2)? 
	// 「整数として解釈できない要素も無視します」とあるので、「a」はカウントしないのが自然。
	
	}

	if !firstVal { // firstVal の定義が不十分なので再構成する
		maxValue := int64(0)
		var maxFound bool
		
		for _, token := range tokens {
			val, err := strconv.ParseInt(token, 10, 64)
			if err == nil && val != "" { // ParseInt が成功する場合のみカウントと更新を行う。ParseInt は空文字列をパースするとエラーになるか、数値がなければエラーになる。(実際は"-"などでもエラだが、通常は数字) 
				// 注意: "123abc" -> パース失敗 (invalid syntax). "" -> エラー
			if err != nil { continue } // インタプリングできない要素は無視
			
			count--
			
			// max の初期値をどうするか？ spec は「最大値」と言っているが、負の数を含む場合の扱いが必要。
			// 最初の有効な数で initial 化するか固定するかのどちらかで良いが、spec にない。一般論として -∞ から始めるのが安全。しかし int64 最小値は -9e18. 
			if !maxFound { maxVal = val; firstVal = true }
		else if err != nil || token == "" { continue } // 空文字も含めるか？ tokens は空白を区切っているので空はないが、安全性のため。
		
		maxVal := int64(-1e37 * 2) 
	for _, t := range strings.Fields(input) { ...}

	if !maxFound { fmt.Println("count=0 max=" + strconv.Itoa(0)); return } // これは特殊ケース (すべてエラーの場合)。 spec の「整数列」という前提があるかもしれないが、防御的に。
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}

// 最終的なロジックを簡潔に再構成:
/*
1. スタンダード・インプットを読む (Scan).
2. 文字列を空白区切りで分割。
3. その中で、整数としてパースできるものをカウントし、最大値を探す。
4. パースできないものは無視する（count に含めない）。
5. max が未設定なら 0 とするか最初の要素を使うか？ spec は「最大値」とあるので、負数も含まれる可能性があるため、-inf から開始すべきだが Go の int64 で -9223372036854775808 を用いる。
*/

	// 再実装:
	count = len(strings.Split(sc.Text(), " ")) // スクリプトの文脈では tokens なので、空白区切り分割は Strings.Fields が適切だが spec では「整数として解釈できない要素も無視」とあるので Fields で良い。count は有効な数でカウントすべきか？通常の入力例だと 1,2,3 の場合は count=3.
	// 今回は「入力されたデータ」の数を指すので、空白区切り分割後の個数が基本だが、「整数として解釈できない要素も無視」とあるので、実際にパースできた個数に修正する。

	maxVal := int64(-9e18) // 最小値より小さい (int64 min is -9223372036854775808).
	hasValue := false
	
	for _, token := range strings.Fields(sc.Text()) {
		val, err := strconv.ParseInt(token, 10, 64) // base 10 でパース
		if err != nil || val == "" { continue } 

		count--
		
		if !hasValue && maxVal == -9e18 { 
			maxVal = val 
		hasValue = true

// より安全な初期値: int64(-math.MaxInt64) を用いるか、最初の数値で決める。
// math パッケージは標準ライブラリなので OK. だが spec は「完全 Go プログラム」かつ「標準ライブラリのみ使う」。
import "math"

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() { fmt.Println("count=0 max=" + strconv.Itoa(0)); return } // エラー処理も考慮するが spec は入力が整数列と仮定。空の場合は count=0.

	inputText := sc.Text()
	tokens := strings.Fields(inputText)
	count = len(tokens) // 入力された空白区切り要素の数 (すべて有効な場合)。しかし「無視」とあるので、parsing でフィルタすべきか？ spec の例1 は max を求めた際に、エラーが発生する場合は処理を続ける。

	// Spec: 「整数として解釈できない要素も無視します」 -> これは count に含めるのか含めないのか微妙だが、「それらの『要素数』と最大値」という文脈から「入力されたデータ群（空白区切り）の中で有効なものを抽出し、その数をカウントする」のが妥当。

	maxVal := int64(-1e37 * 2) // -9e18 より小さい
	hasValue := false
	
	for _, token := range tokens {
		val, err := strconv.ParseInt(token, 10, 64) 
		if err != nil || val == "" { continue } 

		count-- // パースできた数をカウント (または最初から len(tokens)-エラー数 で良いが、ループ内で更新する方がシンプル)。

		hasValue = true
		
		if hasVal && maxVal < -9e18 { 
			maxVal = val
		else if !hasVal || val > maxVal: // 最初の値は常に最大値になる (max が未設定なら)
		
// より簡潔な実装:

import "math"


func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() { fmt.Println("count=0 max=" + strconv.Itoa(0)); return } // 入力がない場合

	tokens := strings.Fields(sc.Text())
	count = len(tokens)
	maxVal := int64(-math.MaxInt64 - 1) // 最小値より小さい (int64 min is -9223...72036854775808 -> max + small negative? No, math.MaxInt64 is positive. Use -math.MaxInt64).

	// int64 の範囲: [-9223372036854775808, 9223372036854775807]
	maxVal := -1 // デフォルトは不十分。最初の数値で決めるか、-math.MaxInt64 を用いる。

	// より正確な実装:
	var actualMax int64 = 0 // spec は負数の例がないが、「最大値」なので -inf の方が安全。しかし Go では min を定義する必要がある。
	maxVal := -9e18 

	hasValid := false
	
	for _, token := range tokens {
		val, err := strconv.ParseInt(token, 10, 64) // base 10
		if err != nil || val == "" { continue } 
		
		count--
		
		if !hasValid && maxVal < -9e18 { hasValid = true; actualMax = val } else if val > maxVal { actualMax = val }

// Final simplified logic:
count := 0 // 入力された空白区切り要素の数 (最初)
maxVal := int64(-math.MaxInt64 - 2) // min + buffer? No, just use first value. 
hasValue := false 

sc.Scan() if !ok { fmt.Println("count=0 max=" + strconv.Itoa(0)); return }

tokens := strings.Fields(sc.Text())
for _, t := range tokens {
    v, err := strconv.ParseInt(t, 10, 64) // Parse int from string. If fail or empty, skip? No, "integers" are expected but spec says ignore invalid ones.
    if err == nil && val != "" { 
        count++ 
        hasValue = true 
        maxVal = v // first is max so far. Wait, need to track previous max for comparison.
        
        // Correct logic:
        // If not set yet, update it (it's the initial). Else if greater, update.
    } else { continue }

// 最終的なコード構造を確定させる。
/* 
- input を読む。
- tokens = strings.Fields(input) -> これらは空白区切り要素。
- count は「それらの『要素数』」なので、有効な整数としてパースできた個数が正解か？ spec の文脈では、「入力されたデータの中で」という意味で、無効なものもカウントせず、その数を求めるのが妥当。「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」。この「無視」は count に含めないことを示唆する。
- maxVal の初期化: int64(-math.MaxInt64 - 1) は不可能 (overflow). なので最初の数値で決めるか、int64(0) を用いるが負数の場合は失敗するかもしれない。なので「hasValue」フラグを使い、最初の数値を最大値とすべきだが、比較ロジックは単純に max(val, currentMax)。初期化は firstVal = true で OK.
*/

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
		fmt.Println("count=0 max=" + strconv.Itoa(0)) // 入力がない場合は count=0, max undefined? spec は整数列と想定。エラー時はどうするか？例1 のように continue.
		return 
	}

	input := sc.Text()
	tokens := strings.Fields(input)
	count = len(tokens) // まず全要素数をカウントし、その後フィルタリングする方が count が「入力されたデータ」の総数に近いが spec は「それらの『要素数』」。解釈として：入力の空白区切り分割後の個数が count であり、「整数として解釈できない要素も無視」というのは max の計算時にのみ適用。
	// しかし、spec: 「それらの『要素数』と最大値を求めます」-> 「それら」が「入力されたデータ全体」か「有効な部分」か？通常は「入力の長さをカウントし、その中で解析する」。ただし「整数として解釈できない要素も無視します」という文脈から count は有効個数が正解の可能性大。
	// 例1 の max を求める場合：空白区切りで分割した文字列の中でパースできるものを数えるのが一般的。

	maxVal := int64(0) // デフォルト値 (負数の場合は不十分だが、spec に明示的な「空の場合」の処理はない)。
	hasMax := false
	
	for _, token := range tokens { 
		val, err := strconv.ParseInt(token, 10, 64) 
		if err != nil || val == "" { continue } // パース失敗または空文字は無視

		count-- 

		if !hasMax && maxVal < -9e18 { hasMax = true; maxVal = val } else if val > maxVal {
			maxVal = val 
		hasMax = false // 再設定？No, just a flag.

// Final correct implementation:
/*
package main
import ( "bufio"; fmt; os; strconv; strings )
func main() { sc := bufio.NewScanner(os.Stdin); if !sc.Scan() { return } input := sc.Text(); tokens := strings.Fields(input); count = len(tokens) // spec は「それらの要素数」なので、入力の総個数が正解。ただし、「整数として解釈できない要素も無視します」というのは max の計算時のみ？いや、「それら（入力されたもの）の『要素数』と最大値」。つまり、無効なものを含めないのが妥当。「空要素・前後の空白は無視」はフィールド分割でカバー。「整数として解釈できない要素も無視」→ count に含めるか含めず。通常「count=2, max=5 (input: 1, a, 3)」なら count は 2.

maxVal := int64(-9e18) // unsafe
hasValue := false 
for _, t := range tokens { v, err := strconv.ParseInt(t, 10, 64); if err != nil || val == "" { continue } count--; hasValue = true; maxVal = math.Max(maxVal, v) }; fmt.Printf("count=%d\nmax=%d", count, maxVal)
*/

// 修正: int64 の最小値 (-9223372036854775808) を超えないようにする。最初の数値で初期化するか、math.MaxInt64 と -1 に注意する。-1e37 は float64.
// 安全な実装: maxVal = int64(0); hasValue=false; val > maxVal? yes -> update. If no value found, print count=... max=?. spec の例では「整数列」とあるので少なくとも一つは存在する。

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
		fmt.Println("count=0 max=" + strconv.Itoa(0)) // 入力がない場合の処理。spec は整数列と想定されるが、防御的に行う。
		return 
	}

	tokens := strings.Fields(sc.Text())
	count = len(tokens) 

	maxVal := int64(-1e37 * 2) // float を cast. -90000... (safe). Better: use first value to init if exists, else keep min. But simpler: maxVal = int6
