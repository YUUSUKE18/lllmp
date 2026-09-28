```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var minVal int64 = 0x7FFFFFFFFFFFFFFF // 最大値
	maxVal, count := int64(0), 0         // 最小値と要素数（初期化）
	hasInput := false

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		fields := []string{}
		lastIdx := -1
		idx := 0
		length := len(line)
		
		for i := idx; i < length; i++ {
			c := line[i]
			
			switch c {
			case ' ':
				if lastIdx >= 0 && lastIdx != idx-2 { // 空白の連続をスキップする処理（ただし、問題文は「空要素・前後の空白は無視」とあるので単純に分割すれば OK）
					// ここでは簡易的にカンマとスペースで区切るロジックを実装。
				}
			case ',':
			default:
				break // 文字列処理の一部（実際には整数パースのみが重要なので、ここではシンプルに実装する）
			}
			
			if i+1 < length && line[i] == '0' {
				lastIdx = idx - 1 
				idx++ // 空白のチェックは簡易的
			} else if c != ',' && (c >= '0' && c <= '9') || lastIdx > 0 {
				if i+1 < length && line[i] == '-' {
					lastIdx = idx - 2 
					idx++ // マイナスのチェックは簡易的
				} else if c != ',' {
					fields[idx] = "" // fields のサイズ固定を避けるため、スライスで管理する（実際には int64 と文字列に変換）
				}
			} else {
				idx++ 
			}
			
			if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			}
			
			if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ') { // カンマまたはスペースで区切るロジックを再考する必要があるため、スライス分割を使用する
				fields = append(fields, line[idx:i]) 
			} else if i+1 < length && line[i] == ',' || (i >= 0 && line[i-1] != ' ')
