import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int pairs = 0;
        int target = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            int[] numbers = line.trim().split("\\s+");
            for (int i = 1; i < numbers.length; i++) {
                try {
                    int n = Integer.parseInt(numbers[i]);
                    if (n == target) pairs++;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
