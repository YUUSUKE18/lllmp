import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long sum = 0;
        
        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                int colonIndex = token.indexOf(':');
                if (colonIndex <= 0) continue; // : が先頭でないか空でない
                
                try {
                    long value = Long.parseLong(token.substring(0, colonIndex));
                    long repeat = Long.parseLong(token.substring(colonIndex + 1).trim());
                    
                    if (repeat < 0) continue; // 回数が負の場合を無視
                    
                    count += repeat;
                    sum += value * repeat;
                } catch (NumberFormatException e) {
                    // 解析できない要素は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
