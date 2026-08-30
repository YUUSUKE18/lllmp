import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        
        String targetStr = sc.nextLine().trim();
        if (targetStr.isEmpty()) return;
        
        try {
            long target = Long.parseLong(targetStr);
        } catch (NumberFormatException e) {
            return;
        }

        long count = 0;
        int n = 0;
        long[] nums = new long[100000]; // Sufficient size for typical competitive programming constraints

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.trim().isEmpty()) continue;
            
            try {
                int val = Integer.parseInt(line.trim());
                nums[n] = val;
                n++;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        long left = 0;
        long right = n - 1;
        
        while (left < right) {
            if (nums[left] + nums[right] == target) {
                count++;
                left++;
                right--;
            } else if (nums[left] + nums[right] > target) {
                right--;
            } else {
                left++;
            }
        }

        System.out.println("pairs=" + count);
    }
}
