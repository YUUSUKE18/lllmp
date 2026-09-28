import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        int count = 0;
        long max = Long.MIN_VALUE; // 初期値を極小整数に設定
        
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (count == 1 || n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
