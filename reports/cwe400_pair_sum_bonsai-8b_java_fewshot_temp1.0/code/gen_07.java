import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int target = 0;
        try {
            target = Integer.parseInt(line);
        } catch (NumberFormatException e) {
        }
        int count = 0;
        int sum = 0;
        int index = 0;
        String[] numbers = br.readLine().trim().split("\\s+");
        for (String num : numbers) {
            if (num.isEmpty()) continue;
            try {
                int n = Integer.parseInt(num);
                sum += n;
                index++;
                if (sum == target && count < 2) {
                    count++;
                    sum = 0;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
