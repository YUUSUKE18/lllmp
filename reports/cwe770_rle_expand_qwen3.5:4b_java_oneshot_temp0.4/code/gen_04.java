import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;
        
        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (!token.contains(":")) {
                continue;
            }
            
            int colonIndex = token.indexOf(':');
            String valueStr = token.substring(0, colonIndex).trim();
            String countStr = token.substring(colonIndex + 1).trim();
            
            try {
                long val = Long.parseLong(valueStr);
                long times = Long.parseLong(countStr);
                
                if (times < 0) continue;
                
                count += times;
                sum += val * times;
            } catch (NumberFormatException e) {
                // 無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
