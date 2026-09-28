import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        String[] parts = line.split(",");
        long sum = 0;

        for (String part : parts) {
            String trimmed = part.trim();
            if (trimmed.isEmpty()) continue;

            try {
                int num = Integer.parseInt(trimmed);
                distinctNumbers.add(num);
                sum += num;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=" + sum);
    }
}
