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
        
        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long sum = 0;
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (!token.matches("[0-9]+:[0-9]*")) {
                continue;
            }
            
            int colonIndex = -1;
            for (int i = 0; i < token.length(); i++) {
                if (token.charAt(i) == ':') {
                    colonIndex = i;
                    break;
                }
            }
            
            if (colonIndex == -1) continue;
            
            String keyStr = token.substring(0, colonIndex).trim();
            String valueStr = token.substring(colonIndex + 1).trim();
            
            if (!keyStr.matches("\\d+") || !valueStr.matches("\\d+")) {
                continue;
            }
            
            try {
                long val = Long.parseLong(keyStr);
                long times = Long.parseLong(valueStr);
                sum += val * times;
                count++;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
