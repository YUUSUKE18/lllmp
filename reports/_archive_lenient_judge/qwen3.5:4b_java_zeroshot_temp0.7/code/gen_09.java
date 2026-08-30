import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Long> distinctNumbers = new HashSet<>();
        
        // 文字列をカンマ区切りで分割し、有効な整数のみ読み込む
        String[] parts = line.split(",");
        for (String part : parts) {
            long num;
            try {
                num = Long.parseLong(part.trim());
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        int count = distinctNumbers.size();
        long sum = 0L;
        
        for (long num : distinctNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
