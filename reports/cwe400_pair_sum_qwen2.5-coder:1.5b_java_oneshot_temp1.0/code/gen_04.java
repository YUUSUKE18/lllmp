import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        int[] nums = new int[target];
        boolean first = true;
        boolean firstPair = true;
        int firstIdx = 0;
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first || n > nums[firstIdx]) { nums[firstIdx] = n; first = false; }
                } catch (NumberFormatException e) {
                }
            }
        }
        for (int i = 0; i < nums.length; i++) {
            if (firstPair) {
                firstPair = false;
                firstIdx = i;
                continue;
            }
            if (nums[i] + nums[firstIdx] == target) {
                count++;
            }
        }
        System.out.println("pairs=" + count);
    }
}
