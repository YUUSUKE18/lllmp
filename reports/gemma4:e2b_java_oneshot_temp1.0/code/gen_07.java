import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Long> uniqueNumbers = new HashSet<>();
        
        // カンマで分割して処理
        String[] parts = line.split(",");
        
        long sum = 0;
        
        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;
            
            try {
                // 整数として解釈。64bitの範囲に収まることを想定しLongで保持
                long number = Long.parseLong(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = uniqueNumbers.size();
        for (long num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
