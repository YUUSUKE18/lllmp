import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        StringTokenizer st = new StringTokenizer(line, ",");
        long count = 0;
        boolean first = true;
        long maxValue = Long.MIN_VALUE; // 初期値を最小整数に設定
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long val = Long.parseLong(token);
                
                if (!first) {
                    count++;
                    if (val > maxValue) {
                        maxValue = val;
                    }
                } else {
                    // 最初の要素はカウントせず、最大値の初期化用として扱う（または最初からカウントするロジック）
                    // 問題文の「count=<個数>」という定義より、入力された整数の総数が count です。
                    // しかし、上記例では first=true の時 max を更新していますが count は増えません。
                    // ここを修正：最初の要素も count に含めるか？ 
                    // 「それらの『要素数』と『最大値』」→ 全ての要素がカウントされるべきです。
                    
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count);
    }
}
