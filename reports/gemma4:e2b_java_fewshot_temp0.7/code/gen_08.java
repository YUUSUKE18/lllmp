import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
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

        String[] parts = line.split(",");
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            try {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                }
            } catch (NumberFormatException e) {
                // Ignore elements that are not valid integers
            }
        }

        int count = uniqueNumbers.size();
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
