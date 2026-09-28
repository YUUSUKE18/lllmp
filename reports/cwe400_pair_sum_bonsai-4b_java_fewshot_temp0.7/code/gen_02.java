import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int pairsCount = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            int[] numbers = line.trim().split("\\s+");
            for (int i = 0; i < numbers.length; i++) {
                if (numbers[i].trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(numbers[i].trim());
                    if (n == target) pairsCount++;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairsCount);
    }
}
