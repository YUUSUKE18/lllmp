import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        int target = Integer.parseInt(line);
        int count = 0;
        int first = true;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            String[] nums = line.split("\\s+");
            for (String num : nums) {
                if (!num.trim().isEmpty() && Integer.parseInt(num) == target) {
                    count++;
                    if (first) first = false;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
