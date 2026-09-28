import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        String[] nums = line.trim().split("\\s+");
        for (String num : nums) {
            if (num.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(num.trim());
                if (n > target && target >= n) {
                    count++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
