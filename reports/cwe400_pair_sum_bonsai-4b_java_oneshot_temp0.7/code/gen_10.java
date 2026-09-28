import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int count = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            String[] numbers = br.lines().stream()
                .skip(1)
                .filter(s -> s.trim().length() > 0)
                .map(s -> Integer.parseInt(s.trim()))
                .collect(java.util.ArrayList::new);
            for (int n : numbers) {
                if (n == target) count++;
                else if (n + target == target) count++;
            }
        }
        System.out.println("pairs=" + count);
    }
}
