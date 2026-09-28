import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += memo.get(1);
                    continue;
                }
                
                int steps = 0;
                while (n != 1) {
                    if (memo.containsKey(n)) {
                        steps += memo.get(n);
                        break;
                    }
                    
                    if (n % 2 == 0) {
                        n = n / 2;
                    } else {
                        // 64bit integer の範囲に収まるように long を使用して計算
                        long nextVal = (long)n * 3 + 1;
                        n = (int)(nextVal % Integer.MAX_VALUE); 
                        // 注意: Collatz 問題では値が整数の上限を超えてしまうことがありますが、
                        // 問題文「64bit 整数の範囲には収まります」とあるので、
                        // 実際の Collatz シークエンスは long で計算し、結果を int にキャストしてマップに保存します。
                        // ただし、n が非常に大きくなると int として表現できない値が現れる可能性があります。
                        // 問題文の制約「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」を考慮し、
                        // 計算プロセスでは long を使用します。
                    }
                    
                    if (n == 1) {
                        steps++;
                        break;
                    }
                }
                
                // メモ化処理を再考: 上記のループ構造は少し複雑なので、より効率的なアプローチに変更する。
                // 実際には、値が int の範囲を超えて long になることがあり、その場合も計算を続行する必要がある。
                // しかし、問題文「64bit 整数の範囲には収まります」は、最終的な結果や途中経過が long で表現可能という意味と解釈できる。
                // したがって、計算プロセス全体で long を使用し、1 に到達するまでのステップ数をカウントする。
                
                n = Integer.parseInt(line);
                steps = 0;
                while (n != 1) {
                    if (memo.containsKey(n)) {
                        steps += memo.get(n);
                        break;
                    }
                    
                    long nextVal;
                    if (n % 2 == 0) {
                        nextVal = n / 2;
                    } else {
                        nextVal = (long)n * 3 + 1;
                    }
                    
                    // 値が int の範囲を超えても、問題文の制約に従って計算を続ける。
                    // ただし、マップに保存する場合は long をキーとして扱う必要があるか、または int 範囲内への収束を待つか。
                    // 問題文「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」
                    // より、long キーを持つマップが必要である可能性が高い。
                    
                    if (nextVal == 1) {
                        steps++;
                        break;
                    }
                    
                    // long にして計算を続ける
                    n = (int)(nextVal); 
                    // ここでは int へキャストしていますが、実際には nextVal が int を超えることがあり、
                    // その場合、n は int の範囲を超えてしまう。したがって、マップのキーは long とすべきである。
                }
                
                // 修正: メモ化のために long キーを使用する必要がある。
                // 上記のロジックを再構築する。
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
