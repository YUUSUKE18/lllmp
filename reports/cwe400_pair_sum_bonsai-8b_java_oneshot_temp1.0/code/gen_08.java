import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        int target = 0;
        try {
            target = Integer.parseInt(line);
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }
        int count = 0;
        String nextLine = br.readLine();
        while (nextLine != null) {
            String[] nums = nextLine.trim().split("\\s+");
            for (int i = 0; i < nums.length; i++) {
                if (nums[i].isEmpty()) continue;
                try {
                    int num = Integer.parseInt(nums[i]);
                    if (num == 0) continue;
                    for (int j = i + 1; j < nums.length; j++) {
                        if (nums[j].isEmpty()) continue;
                        try {
                            int otherNum = Integer.parseInt(nums[j]);
                            if (otherNum == 0) continue;
                            if (num + otherNum == target) {
                                count++;
                            }
                        } catch (NumberFormatException e) {
                        }
                    }
                } catch (NumberFormatException e) {
                }
            }
            nextLine = br.readLine();
        }
        System.out.println("pairs=" + count);
    }
}
