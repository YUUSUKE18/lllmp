import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int[] nums = new int[target];
        int i = 0;
        while ((line = br.readLine()) != null && i < target) {
            try {
                nums[i++] = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                continue;
            }
        }
        for (int j = 0; j < nums.length; j++) {
            for (int k = j + 1; k < nums.length; k++) {
                if (nums[j] + nums[k] == target) pairs++;
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
