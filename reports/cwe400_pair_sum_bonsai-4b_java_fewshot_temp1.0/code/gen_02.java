import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int pairs = 0;
        if (line != null && line.trim().length() > 0) {
            String[] parts = line.trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) {
                if (parts[i].trim().length() > 0) {
                    try {
                        nums[i] = Integer.parseInt(parts[i].trim());
                    } catch (NumberFormatException e) {
                        continue;
                    }
                }
            }
            int goal = Integer.parseInt(line.trim().split("\\s+")[0]);
            for (int i = 1; i < nums.length; i++) {
                int target = nums[i];
                if (target == goal) {
                    pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
