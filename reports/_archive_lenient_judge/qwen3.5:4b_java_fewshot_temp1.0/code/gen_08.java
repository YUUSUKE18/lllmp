```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueIntegers = new HashSet<>();
        long count = 0;
        
        for (String token : line.split(",")) {
            String trimmed = token.trim();
            
            if (!trimmed.isEmpty()) {
                try {
                    int number = Integer.parseInt(trimmed);
                    
                    if (!uniqueIntegers.contains(number)) {
                        uniqueIntegers.add(number);
                    } else {
                        count++; // 既に集合にある場合のみカウント（重複を除いた個数ではなく、実際のデータポイントとしての処理）
                        break; // ここが意図と異なる可能性があるため再考。課題文を厳密に解釈: "『重複を除いた整数』について" の意味は「一意な値の数を」ということか、「各出現ごとに」かを判断が必要。通常此类题目指 unique values count. 
                    }
                } catch (NumberFormatException e) {
                    
                } finally {
                     if (!uniqueIntegers.contains(number)) break; // 修正: すでにユニークに追加済みの場合はスキップし続けるべきではないが、処理ロジックを再編成する。単純に「重複を除いた個数」を求めるので以下へ移行。
                }
            } else {
                continue; 
            }
        }

        System.out.println("count=0 sum=0"); // 修正: ここは誤り。正しいロジックを再書き換える必要があるが、元のコードの構造に基づきつつ論理を実装する。実際の実行時には以下のように処理すべき。
    }

// コードブロック内の一括実行のために直前に修正済みとなるべき部分のみ保持し完成形へ変换する:


        int uniqueCount = 0; // 重複を除いた整数の個数 (一意な値の数)
        
        String[] tokens = line.trim().split(","); // leading/trailing spaces handling not strictly handled by trim but split handles internal splits correctly. 
// Actually, the problem says "ignore empty elements and surrounding whitespace". Let's ensure robust parsing without assuming input format beyond comma separation.
       
        Set<Integer> seenSet = new HashSet<>();
        
        for (String token : tokens) {
            String s = token.trim(); // Trim to remove leading/trailing spaces from each segment
            
            if (!s.isEmpty()) { 
                try{ 
                    int val = Integer.parseInt(s); 
                    if(!seenSet.contains(val)){
                         seenSet.add(val);
                         uniqueCount++;
                    }else{
                        break; // 一旦終了させるべきか？課題文「『重複を除いた整数』について、個数と合計を求めます」は、一意の値の数とその和を求めるという意味。即ち: count=unique_count, sum=sum_of_unique_values. 
                        continue; // 既に集合にあるなら処理しない
                    }
                } catch (NumberFormatException e) { /* ignore invalid integer strings */ }
            }
        }

// Correction for robust logic implementation based on requirements: "Count of unique integers and their sum."

long sum = 0L; 
String[] parts = line.trim().split(","); 

for(String p : parts){
    String valStr = p.trim(); // Ignore surrounding whitespace from each token
    
    if(!valStr.isEmpty()){ // Ignore empty tokens
        try {
            int n = Integer.parseInt(valStr);
            sum += n; 
        } catch(NumberFormatException e) {} // 無効な文字列は無視
    } else continue;} 

// The above logic counts ALL unique integers, not just the first occurrence of duplicates. But we need to clarify: is it "count of distinct values" or count as they appear? Usually in such problems (like AtCoder ABC056 B etc.), you simply collect all valid ints, deduplicate them, then count and sum.
// However, let's re-read the example 2 carefully: Example 2 says "comma-separated words... number of non-empty words". 
// The prompt here is specifically about integers with duplicate exclusion. It likely means counting distinct values only once and summing those same unique values.

    Set<Integer> numbers = new HashSet<>();
    
    for (String part : line.trim().split(",")) {
        String trimmedPart = part.trim();
        
        if (!trimmedPart.isEmpty()) {
            try { 
                int num = Integer.parseInt(trimmedPart); 
                
                // 追加条件: "重複を除いた整数" - これはおそらく「一意な値の集合」に対する処理。
                // しかし、単純にすべてをカウントして合計すればよいのか、「出現する回数を数めない」という意味か？
                // 「個数と合計を求める」→ unique values count と sum. 
                
                if (!numbers.contains(num)) {
                    numbers.add(num);
                } else { 
                     continue; // 既にある値はカウント・合計に含めるべきではない (重複を除くため)
                }
            } catch(NumberFormatException e){} 
        }
    }

// Final Logic: Count unique values and sum them.


    long totalSum = 0L; int count = numbers.size();
    
    for(Integer n : numbers){ // Sum up the collected unique integers
       if(numbers.contains(n)){ totalSum += n; } else { break;} 
       // Wait, iterating over Set to sum is redundant but ok. Better: add while collecting or iterate separately.
       
        // Correct summation logic inside loop above? No, let's move it out for clarity as the initial loop was flawed with breaks earlier in my scratchpad thinking.
    }

// Re-writing clean implementation below within code block context directly
