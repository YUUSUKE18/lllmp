import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean initialized = false;
        
        if (line != null && !line.trim().isEmpty()) {
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim(); // 前後の空白を除去
                
                try {
                    long value = Long.parseLong(part);
                    
                    if (!initialized || value > maxValue) {
                        maxValue = value;
                        initialized = true;
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        } else {
            // エンターだけ入力された場合は、0 の場合を除く（空リスト）
             maxValue = -1; 
             count = 0;
        }

        System.out.println("count=" + count + " max=" + (initialized ? Integer.MAX_VALUE : Long.MIN_VALUE));
    }
}
