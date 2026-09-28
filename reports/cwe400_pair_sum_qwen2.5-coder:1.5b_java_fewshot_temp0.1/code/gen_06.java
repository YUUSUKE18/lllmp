import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int[] nums = new int[1000000];
        int n = 0;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line.trim());
                if (n < nums.length) {
                    nums[n++] = num;
                }
            } catch (NumberFormatException e) {
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
