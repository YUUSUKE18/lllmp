import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0, count = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            String[] numbers = line.trim().split("\\s+");
            for (String num : numbers) {
                if (num.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(num.trim());
                    if (n == target) count++;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
            System.out.println("pairs=" + count);
        }
    }
}
