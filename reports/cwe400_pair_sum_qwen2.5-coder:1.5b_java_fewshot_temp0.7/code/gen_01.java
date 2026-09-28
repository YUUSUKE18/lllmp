import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line);
        int pairs = 0;
        int[] nums = new int[1000000];
        int count = 0;
        while ((ch = br.read()) != -1) {
            if (ch == '\n') continue;
            try {
                int n = Integer.parseInt(String.valueOf((char) ch));
                if (n > 0 && n <= 1000000) {
                    nums[count++] = n;
                }
            } catch (NumberFormatException e) {
            }
        }
        for (int i = 0; i < count - 1; i++) {
            for (int j = i + 1; j < count; j++) {
                if (nums[i] + nums[j] == target) {
                    pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
