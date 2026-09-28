import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        long count = 0;
        long maxValue = Long.MIN_VALUE; // データが存在しない場合はこれが出力される（または最小値として扱うが、通常 empty case は count=0）
        
        String[] parts = line.trim().split(",");
        
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty()) {
                try {
                    long n = Long.parseLong(part);
                    count++;
                    if (n > maxValue || count == 1) { // 最初の要素は常に更新対象（初期値より小さい場合や等しい場合）
                        maxValue = n;
                    } else if (n >= maxValue) {
                         // 同じ最大値がある場合は、後続の値で上書きされないようにする必要があるか？
                         // 問題文「最大値」なので、最初に見つかった最大値を保持すれば良い。
                         // ただし count=1 の条件は既に満たしているため、単純に n > maxValue で十分。
                    } else if (count == 0) { 
                        // このケースはまず catch にあるが、安全策として追加する（実際には最初の要素で max が設定される）
                        // しかし上記のロジックでは count=1 の時点で max は更新されているので、この行は不要。
                    } else if (n > maxValue) {
                         // 修正：単純に n > maxValue で十分。 
                         // なぜなら最初の要素（count=0->1）で max が設定されるため。
                         pass;
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
    
    // 上記の複雑なロジックを単純化し、正しい実装にするために再考:
}
