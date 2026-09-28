import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        String[] numbers = line.trim().split("\\s+");
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i].trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(numbers[i].trim());
                if (n == target) pairs++;
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + pairs);
    }
}
