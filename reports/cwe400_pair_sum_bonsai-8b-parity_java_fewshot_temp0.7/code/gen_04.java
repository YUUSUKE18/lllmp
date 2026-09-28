import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        int target = Integer.parseInt(line);
        int count = 0;
        int sum = 0;
        boolean first = true;
        String[] numbers = br.readLine().trim().split("\\s+");
        for (String num : numbers) {
            if (!num.isEmpty() && !num.trim().isEmpty()) {
                try {
                    int n = Integer.parseInt(num);
                    if (!first) {
                        sum += n;
                        if (sum == target) count++;
                    }
                    first = false;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
