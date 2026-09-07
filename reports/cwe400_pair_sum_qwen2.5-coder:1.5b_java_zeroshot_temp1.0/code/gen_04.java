import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            int target = Integer.parseInt(reader.readLine());
            int pairCount = 0;

            String[] numbers = reader.readLine().split(" ");
            for (int i = 0; i < numbers.length; i++) {
                for (int j = i + 1; j < numbers.length; j++) {
                    if (Integer.parseInt(numbers[i]) + Integer.parseInt(numbers[j]) == target) {
                        pairCount++;
                    }
                }
            }

            System.out.println("pairs=" + pairCount);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
