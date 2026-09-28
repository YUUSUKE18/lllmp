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

        String[] parts = line.split(",");
        Set<Integer> uniqueNumbers = new HashSet<>();
        long totalSum = 0L;
        int count = 0;

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) {
                continue;
            }

            try {
                int num = Integer.parseInt(part);
                uniqueNumbers.add(num);
                totalSum += num;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
