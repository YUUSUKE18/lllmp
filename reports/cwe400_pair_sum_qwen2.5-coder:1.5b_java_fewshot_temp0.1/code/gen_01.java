import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int[] nums = new int[1000000];
        int n = 0;
        while ((ch = br.read()) != -1) {
            if (ch == '\n') {
                if (n > 1) {
                    for (int i = 0; i < n; i++) {
                        for (int j = i + 1; j < n; j++) {
                            if (nums[i] + nums[j] == target) {
                                pairs++;
                            }
                        }
                    }
                }
                n = 0;
            } else {
                nums[n++] = ch - '0';
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
