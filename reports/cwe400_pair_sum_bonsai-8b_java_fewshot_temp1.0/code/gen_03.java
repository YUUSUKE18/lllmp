import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line);
            } catch (NumberFormatException e) {
            }
        }
        int count = 0;
        int sum = 0;
        String[] numbers = br.readLine().trim().split("\\s+");
        for (int i = 0; i < numbers.length; i++) {
            String num = numbers[i];
            if (num.isEmpty()) continue;
            try {
                int n = Integer.parseInt(num);
                if (sum + n == target) count++;
                sum += n;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
