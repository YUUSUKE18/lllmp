import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null && !line.trim().isEmpty()) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                // "値:回数" の形式を検出
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1) continue;
                
                String valStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long value = Long.parseLong(valStr);
                    long repeat = Long.parseLong(countStr);
                    if (repeat >= 0) {
                        sum += value * repeat;
                        count += repeat;
                    }
                } catch (NumberFormatException e) {
                    // 解析エラーは無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
