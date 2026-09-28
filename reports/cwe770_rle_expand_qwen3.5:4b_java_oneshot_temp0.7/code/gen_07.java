import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        long count = 0;
        long sum = 0;
        
        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (!token.matches("^-?\\d+:\\s*\\d+$")) {
                continue;
            }
            
            int colonIndex = -1;
            for (int i = 0; i < token.length(); i++) {
                if (token.charAt(i) == ':') {
                    colonIndex = i;
                    break;
                }
            }
            
            if (colonIndex == -1) {
                continue;
            }
            
            String valueStr = token.substring(0, colonIndex).trim();
            String countStr = token.substring(colonIndex + 1).trim();
            
            try {
                int val = Integer.parseInt(valueStr);
                int k = Integer.parseInt(countStr);
                if (k < 0) continue;
                count += k;
                sum += (long)val * k;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
