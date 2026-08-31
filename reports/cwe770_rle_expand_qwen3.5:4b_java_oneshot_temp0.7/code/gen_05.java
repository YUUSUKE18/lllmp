import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0L;
        long sum = 0L;
        
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                // "値:回数" の形式で解析
                int colonIndex = -1;
                for (int i = 0; i < token.length(); i++) {
                    if (token.charAt(i) == ':') {
                        colonIndex = i;
                        break;
                    }
                }
                
                if (colonIndex == -1 || colonIndex == 0 || colonIndex == token.length() - 1) {
                    continue; // 形式が不正または空白が含まれている場合スキップ
                }
                
                try {
                    long value = Long.parseLong(token.substring(0, colonIndex));
                    long repeat = Long.parseLong(token.substring(colonIndex + 1));
                    
                    if (repeat < 0) {
                        continue; // 回数が負の場合は無視
                    }
                    
                    count += repeat;
                    sum += value * repeat;
                } catch (NumberFormatException e) {
                    // 数値解析失敗時はスキップ
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
