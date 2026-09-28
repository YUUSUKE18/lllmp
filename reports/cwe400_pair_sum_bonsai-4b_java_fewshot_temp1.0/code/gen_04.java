import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int pairs = 0;
        int[] nums = new int[1000000];
        int count = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            String[] parts = line.trim().split("\\s+");
            for (String f : parts) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (n == target) pairs++;
                    nums[count++] = n;
                } catch (NumberFormatException e) {}
            }
            if (count > 2) {
                for (int i = 0; i < count - 1; i++) {
                    if (nums[i] + nums[i + 1] == target) pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
