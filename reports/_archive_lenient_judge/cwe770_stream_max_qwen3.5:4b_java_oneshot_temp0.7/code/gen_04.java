import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            
            while (st.hasMoreTokens()) {
                try {
                    String token = st.nextToken().trim();
                    if (!token.isEmpty() && isInteger(token)) {
                        long n = Long.parseLong(token);
                        count++;
                        
                        // 最大値の計算（初期化は最初の有効要素で行う）
                        if (count == 1) {
                            maxVal = n;
                        } else if (n > maxVal) {
                            maxVal = n;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + maxVal);
    }

    private static boolean isInteger(String s) {
        try {
            Long.parseLong(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static long maxVal = 0L; // デフォルト値（最小の整数に近い）
}
