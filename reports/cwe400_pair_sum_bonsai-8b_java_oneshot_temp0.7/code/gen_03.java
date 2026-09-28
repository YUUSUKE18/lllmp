import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        boolean first = true;
        long sum = 0;
        long count = 0;
        long[] numbers = new long[1000000]; // 1 million integers
        int index = 0;

        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
                // Invalid target line, ignore
            }

            String nextLine;
            while ((nextLine = br.readLine()) != null) {
                String[] parts = nextLine.trim().split("\\s+");
                for (String part : parts) {
                    if (part.isEmpty()) continue;
                    try {
                        long num = Long.parseLong(part);
                        numbers[index++] = num;
                        sum += num;
                        if (sum > target) break;
                    } catch (NumberFormatException e) {
                        // Skip invalid numbers
                    }
                }
                if (sum > target) break;
            }
        }

        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
