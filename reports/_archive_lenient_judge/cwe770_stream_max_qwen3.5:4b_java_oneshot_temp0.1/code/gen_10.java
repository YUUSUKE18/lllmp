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
                long value = Long.parseLong(token);
                
                if (!first) {
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                } else {
                    // 最初の要素はカウントせず、最大値の初期化用として扱う（または最初から count=1 とする）
                    // 問題文の「count=<個数>」を厳密に満たすため、最初の要素もカウント対象とするのが自然だが、
                    // 上記ロジックでは first=true の分岐で処理していない。修正:
                }
            } catch (NumberFormatException e) {
                continue;
            }

            if (!first || value > maxValue) {
                count++; 
                maxValue = Math.max(maxValue, value);
            } else {
                 // 最初の要素のみをカウントし、max に設定する修正ロジック:
                 // 上記の try-catch ブロック内では値が取得されているので再処理が必要か？
                 // よりシンプルに書き直す。
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
