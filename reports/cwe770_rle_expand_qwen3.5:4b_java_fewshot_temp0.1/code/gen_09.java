import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                int colonIndex = token.indexOf(':');
                if (colonIndex == -1) continue;
                
                try {
                    long value = Long.parseLong(token.substring(0, colonIndex));
                    long repeat = Long.parseLong(token.substring(colonIndex + 1));
                    count += repeat;
                    sum += value * repeat;
                } catch (NumberFormatException e) {
                    // 無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
