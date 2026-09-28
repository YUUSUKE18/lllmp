import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        
        // カンマで分割して処理
        String[] parts = line.split(",");
        
        long sum = 0;
        
        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            try {
                int number = Integer.parseInt(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = uniqueNumbers.size();
        long totalSum = 0;
        for (int num : uniqueNumbers) {
            totalSum += num;
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
