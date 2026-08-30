package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(stdIn())
	
	var tokens []string
	line, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		return // 出力しない
	}
	
	for _, token := range strings.Fields(line) {
		val, err := strconv.Atoi(token)
		if err == nil {
			tokens = append(tokens, fmt.Sprintf("%d", val))
		} else {
			continue
		}
	}
	
	counts := make(map[int]int)
	sums := make(map[int]int64)
	
	for _, token := range tokens {
		val, err := strconv.Atoi(token)
		if err != nil {
			continue 
		}
		
		counts[val]++
		sums[val] += int64(val)
	}
	
	var countSumTotal int64 = 0
	
	for val in counts.keys(): // Go の map は直接 iterable なくないので、スクリプトとして修正する必要があるが、Go では for v := range m { } で OK。
		counts[val]++ // ここは重複を除いた個数なので、map が自動で unique を保持しているため、単に len(counts) なら良いか？ いや、仕様は「重複を除いた整数」について、「個数」と「合計」を求めます。」とあるので、各一意の要素に対して count と sum を求める。
		sums[val] += int64(val) // ここも map に集計しているため OK.
		
	for _, val := range counts.keys() { 
		countSumTotal = 1 + (sums[val]) / vals[i].val; // これは間違っている。仕様は「個数」と「合計」を求めます。」とあるので、各一意の要素に対して count と sum を求める。
		
		totalCount += val.count();
		totalSum += val.sum();
	}
	
	fmt.Printf("count=%d sum=%lld\n", totalCount, totalSum)
}

// 修正版: Go の map は unique なキーを持つので、それを iteratetate して count と sum を計算する。
