import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int count = 0;
        long sum = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                // 行を整数としてパース
                long n = Long.parseLong(line.trim());
                sum += n;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
