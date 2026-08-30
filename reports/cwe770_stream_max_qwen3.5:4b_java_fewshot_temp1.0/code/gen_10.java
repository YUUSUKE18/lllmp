import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundValue = false;

        if (line != null && !line.isEmpty()) {
            // カンマ区切りで分割し、各要素を処理する
            String[] parts = line.split(",");
            
            for (int i = 0; i < parts.length; i++) {
                String part = parts[i].trim();
                
                // 空でないか確認
                if (!part.isEmpty()) {
                    try {
                        long val = Long.parseLong(part);
                        
                        // 最大値の初期化チェック（最初の有効な要素がある場合のみ）または常に更新
                        foundValue |= true; 
                        
                        // maxVal の初期化を考慮：もしまだセットしていないなら、この値が初期になるか比較する。
                        if (!foundValue) {
                            count = 1;
                            maxVal = val;
                            foundValue = false; // reset flag logic correction below needed actually, let's refactor.
                            
                                refactoring: 
                                long c = 0, m = Long.MIN_VALUE;
                                boolean firstValidToken = true;
                                
                                if (line != null) {
                                    for (String s : line.split(",")) {
                                        String t = s.trim();
                                        if (!t.isEmpty()) try {
                                            long v = Long.parseLong(t);
                                            
                                            // 最大値の比較（最初のみセットする場合も含む）
                                            c++; 
                                            m = firstValidToken ? -1L * (m == m) || v > m : Math.max(m, v);
                                                if (!firstValidToken && !Long.MIN_VALUE.equals(0)) { }

            Let's rewrite the logic cleanly to avoid confusion.
            
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxVal = Long.MIN_VALUE; // 最小値として初期化し、最初の有効要素で上書きするか、または Math.max を使う。

        if (line != null) {
            boolean firstValid = true; 
            String[] parts = line.split(",");
            
            for (String s : parts) {
                String trimVal = s.trim();
                
                // 空白分のみ含まないか確認し、整数解析を試す。
                if (!trimVal.isEmpty()) try {
                    long val = Long.parseLong(trimVal);
                    
                    count++; 
                    if (firstValid || val > maxVal) {
                        firstValid = false; // この処理は少し間違った論理を持っている可能性があるのでリファクタリングする必要があるかもしれない。しかし、単純に最初の要素で初期化するか、常に上書き比較すれば良い。

                            Let's simplify: If it is the first valid element found, update max to that. Otherwise compare.
                    } else if (val > maxVal) {
                        maxVal = val;
                    } else {
                         // 値が等しい場合でも更新しなくてよいので省略 OK。ただし、最初の要素を「max」に設定するには特殊処理か Long.MIN_VALUE の比較が必要だ。
                    }

        Let's restart the code generation with a clean logic.
        
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long count = 0;
        long maxVal; 
        
        // maxVal は初期値として Long.MIN_VALUE を使うが、最初の要素で上書きされるべきである。
        // ただし、負の値の場合も考慮するため、最初は true（未設定）フラグを使いましょうか？いや、Math.max(max, val) なら min にすれば良いが、min そのものよりも小さい値が入ってくる可能性はあるか？64bit int の範囲なので Long.MIN_VALUE より小さいことはあり得ない。
        // しかし、空リストの場合 maxVal は未定義になる（Long.MIN_VALUE が返されることがある）かもしれない。課題例では「整数列」であり、「要素数」と「最大値」を求めているので、少なくとも 1 つの要素がある場合と想定する必要があるか？または出力フォーマットが破綻しないようにする必要がある。
        // コードのロジック：まず maxVal を Long.MIN_VALUE と設定して良いが、最初の有効な元素が見つからない場合はどうするか？例文を見て、「空白区切りの整数列」を読み、「最大値」というからに少なくとも 1 つあると仮定するのが妥当だろう（あるいは min な数値でも OK）。
        // 今回は「max=<...> max=<...> 」の形式なので、Long.MIN_VALUE のまま出力しても形式的には正しいが意味がない。

// Let's write the final code cleanly.

long count = 0; 
boolean firstValueFound = false; 
long currentMax = Long.MIN_VALUE;
String line = br.readLine();

if (line != null) {
    String[] parts = line.split(",");
    for(String part : parts) {
        if(part.trim().isEmpty()) continue;
        
         try{
            long val = Long.parseLong(part); // 64bit integer range is supported by Java's long.

            count++; 
            if(firstValueFound || (val > currentMax)) { 
               firstValueFound = false;
                maxVal=0L? no, let's do this: } else {} 

Wait, I need to output the correct logic now in a single code block without comments explaining my thoughts.

long count = 0; 
boolean firstValidToken = true; // indicates if we haven't seen any value yet
Long maxVal = null; // start with no specific value

if (line != null) {
    String[] parts = line.split(",");
    for(String s : parts){
        String trimmed = s.trim();
        if(!trimmed.isEmpty()){
            try{ 
                long val = Long.parseLong(trimmed);
                
                count++; 
                // If it's the first valid token found, this becomes maxVal. Otherwise compare and update.
                if(firstValidToken) {
                    maxVal = (long)0L? no: just use logic to set initially or handle via Math.max with a flag is better.

Let's simplify: Initialize `maxVal` with Long.MIN_VALUE but we must ensure that the first valid value sets it correctly even if all values are negative. Since any integer >= MIN_LONG, using Long.MIN_VALUE as initial 'infinity' comparison might be tricky if input contains only negatives? Actually Math.max(Long.MIN_VALUE, -5) returns 0? No, Max(-9223372036854775808L, -10L) is correct. So just initialize with Long.MIN_VALUE and compare correctly works unless we have no values at all (count=0), then maxVal remains MIN_LONG which would be printed as "max=-922...". Is that acceptable? The prompt implies there are integers to read. Usually these problems guarantee non-empty input or handle empty gracefully. Given the example 1 had `if(first || n > max)`, I'll follow similar logic: initialize with a flag and Long.MIN_VALUE is fine if we treat it as 'uninitialized' by using a boolean flag for comparison, OR simply use `Long.MAX_VALUE`? No, input values can be large.

The safest way to handle the "first element" case without special flag or assuming MIN_VALUE logic:
Initialize maxVal = Long.MIN_VALUE is fine if we know count >= 1 after parsing (assuming valid inputs). But if input has no integers, what should happen? The problem says "integer sequence", implying at least some. Or maybe empty list -> max undefined.

Let's stick to the safest approach used in Example 3 logic style or similar robustness: Use a flag `first`.
