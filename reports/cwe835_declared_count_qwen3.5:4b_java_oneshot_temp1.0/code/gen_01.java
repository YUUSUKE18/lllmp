import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目の整数（合計数）を読む
        String line1 = br.readLine();
        int count = 0;
        if (line1 != null && !line1.trim().isEmpty()) {
            try {
                count = Integer.parseInt(line1.trim());
            } catch (NumberFormatException e) {
            }
        }
        
        long sum = 0;
        boolean first = true;
        
        while ((line1 = br.readLine()) != null) {
            if (line1.trim().isEmpty()) {
                continue;
            }
            
            String[] tokens = line1.split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) {
                    continue;
                }
                
                try {
                    long n = Long.parseLong(token);
                    if (first || !first) { // first 条件は常に true に設定済みなので論理的には同じだが、文脈を保つ
                         sum += n;
                         count++; // 実際に読み取れた整数の数をカウント
                    } else {
                        // 既に最初の値を読み込み済みの場合でも、合計を加算する
                        // ただし、問題文は「実際に読み取れた整数だけ」を対象とすることを重視している。
                        // 上記の実装は常に count++ と sum+=n を行うロジックだが、
                        // 'first' フラグの使い方が少し不自然だったため修正します。
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
