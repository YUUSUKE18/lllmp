import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String target = br.readLine();
        int pairs = 0;
        boolean first = true;
        if (target != null) {
            for (int i = 1; i < Integer.parseInt(target); i++) {
                String line = br.readLine();
                if (line != null) {
                    int[] nums = new int[Integer.parseInt(line)];
                    int count = 0;
                    boolean found = false;
                    for (int j = 0; j < nums.length; j++) {
                        if (nums[j] == 0) {
                            nums[j] = i;
                            count++;
                            if (count == 2) {
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found) pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
