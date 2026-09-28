import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        int i = 0;
        int j = 0;
        int n = 0;
        int sum = 0;
        int[] nums = new int[1000000];
        while ((n = br.readLine()) != null) {
            String[] parts = n.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    nums[i] = Integer.parseInt(part);
                    i++;
                } catch (NumberFormatException e) {
                }
            }
        }
        for (int k = 0; k < i - 1; k++) {
            for (int l = k + 1; l < i; l++) {
                sum = nums[k] + nums[l];
                if (sum == target) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
