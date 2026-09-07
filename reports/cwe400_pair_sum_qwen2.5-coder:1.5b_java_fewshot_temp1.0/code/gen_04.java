import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int target = Integer.parseInt(br.readLine());
        int pairs = 0;
        int[] nums = new int[2];
        boolean found = false;
        boolean first = true;
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            String[] parts = line.split("\\s+");
            if (parts.length != 1) {
                for (String num : parts) {
                    if (!num.trim().isEmpty()) {
                        int n = Integer.parseInt(num);
                        if (first || n > nums[0]) { 
                            nums[1] = nums[0];
                            nums[0] = n;
                        } else if (n < nums[1]) {
                            nums[1] = n;
                        }
                        if (first) {
                            first = false;
                        }
                        if (nums[0] + nums[1] == target) {
                            found = true;
                            pairs++;
                        }
                    }
                }
            }
        }
        if (found) {
            System.out.println("pairs=" + pairs);
        } else {
            System.out.println("not found");
        }
    }
}
