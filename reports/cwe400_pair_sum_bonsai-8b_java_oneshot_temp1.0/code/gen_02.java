import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        boolean first = true;
        if (line != null) {
            try {
                target = Integer.parseInt(line);
            } catch (NumberFormatException e) {
            }
        }
        int sum = 0;
        int count = 0;
        boolean used = [0];
        int[] nums = new int[1000000];
        int n = 0;
        boolean found = false;
        if (first) {
            n = 0;
        }
        int[] indices = new int[1000000];
        int m = 0;
        for (String s : br.readLine().trim().split("\\s+")) {
            if (s.isEmpty()) continue;
            try {
                int num = Integer.parseInt(s);
                if (num > target) continue;
                nums[n++] = num;
                indices[m++] = n;
                if (sum + num == target && m > n) {
                    count++;
                    found = true;
                }
                if (found) {
                    break;
                }
                if (m >= n) {
                    sum = 0;
                    found = false;
                }
            } catch (NumberFormatException e) {
            }
        }
        if (found) {
            System.out.println("pairs=" + count);
        }
    }
}
