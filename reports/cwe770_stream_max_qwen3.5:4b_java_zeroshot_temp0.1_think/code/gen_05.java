import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        String input = sb.toString();
        String[] parts = input.split(",");

        long count = 0;
        long max = Long.MIN_VALUE;

        for (String part : parts) {
            String trimmed = part.trim();
            if (trimmed.isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(trimmed);
                count++;
                if (val > max) {
                    max = val;
                }
            } catch (NumberFormatException e) {
                // Ignore elements that cannot be interpreted as integers
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
