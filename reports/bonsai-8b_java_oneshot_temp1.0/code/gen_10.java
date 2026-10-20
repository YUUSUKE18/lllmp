import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int[] nums = new int[0];
        String[] parts = line.trim().split("\\s+");
        for (String s : parts) {
            if (s.isEmpty()) continue;
            try {
                int n = Integer.parseInt(s);
                nums[nums.length++] = n;
            } catch (NumberFormatException e) {
            }
        }
        int count = 0;
        int sum = 0;
        boolean seen = new boolean[1000000007];
        for (int n : nums) {
            if (!seen[n]) {
                seen[n] = true;
                count++;
                sum += n;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
