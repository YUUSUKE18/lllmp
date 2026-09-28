import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int countFromInput;
        try {
            countFromInput = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 空行をスキップし、有効な整数があるか確認
                if (line.trim().isEmpty()) continue;
                
                long value = Long.parseLong(line.trim());
                sum += value;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解析できない場合は無視
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
