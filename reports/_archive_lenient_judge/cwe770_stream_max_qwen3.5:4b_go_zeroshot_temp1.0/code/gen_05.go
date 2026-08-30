```go
package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil, nil, "") // 空のデフォルトを使用しないため無視
	
	scanner := bufio.NewScanner(stdin) 
	var count int = -1
	maxVal := int64(math.MaxInt64) // Go の最大値を初期化

	for scanner.Scan() {
		line := string(scanner.Bytes())
		
		if len(line) == 0 || line[0] == '\n' || line[len(line)-1:] == "\r\n" {\
			continue
		
		}
	
		fmt.Println(line) // 行ごとに印刷
	
	for _, str := range strings.Split(line, ",") {
	    if s := strings.TrimSpace(str); len(s) > 0 && (digit[...]) {
	        valStr := string(digit[:len(val)])
	        
        	valInt64, err := strconv.ParseInt(val, 10, 64)
		    if err == nil {
		        count++
	            maxVal = math.Max(maxVal, valInt64)
		    } else{
	        	continue // エラーがある場合はスキップ
	   	}
	   } 
   }
   
	if maxVal == int64(math.MaxInt64) && count > 0 {	
			maxVal = -1
	}else if maxVal == math.MaxInt64 {
		fmt.Printf("count=%d\n", count)\n
		return
	
}

fmt.Println() // メイン終了時に改行を追加
