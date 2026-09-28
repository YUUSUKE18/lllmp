import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String inputLine = reader.readLine();

        if (inputLine == null || inputLine.trim().isEmpty()) {
            return;
        }

        String[] parts = inputLine.split(",");
        Set<Long> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    long number = Long.parseLong(trimmed);
                    uniqueNumbers.add(number);
                    sum += number;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
