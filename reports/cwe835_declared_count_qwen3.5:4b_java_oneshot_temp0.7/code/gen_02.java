import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1 行目が整数でない場合、読み取れた整数の数は 0
            System.out.println("count=0 sum=0");
            return;
        }
        
        int count = 0;
        long sum = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long value = Long.parseLong(line.trim());
                count++;
                sum += value;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
