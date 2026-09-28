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
        long maxVal = Long.MIN_VALUE; // 初期値を最小値に設定
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long val = Long.parseLong(token);
                
                if (!first) {
                    count++;
                    if (val > maxVal) {
                        maxVal = val;
                    }
                } else {
                    // 最初の要素はカウントせず、最大値の初期化用として扱う（または第一要素をカウント）
                    // 問題文「それらの『要素数』」なので、有効な整数が1つでもあれば count=1 が適切。
                    // しかし、上記ロジックでは first=true の時だけ maxVal を更新し count は増えない。
                    // 修正：最初の要素もカウントに入れるべきか？通常は「入力された個数」として全てをカウントする。
                    // 再考: "それらの『要素数』" -> 解析できた整数の総数。
                    
                    if (val > maxVal) {
                        maxVal = val;
                    }
                }
                
                count++; 
            } catch (NumberFormatException e) {
                // 無視する
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
