import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        int target = Integer.parseInt(line);
        int count = 0;
        int first = 1;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            int num;
            try {
                num = Integer.parseInt(line);
            } catch (NumberFormatException e) {
                continue;
            }
            if (first || num > target) {
                first = false;
                count++;
            } else if (num < target) {
                if (count > 0) {
                    count--;
                    if (first || num + count > target) {
                        count++;
                    }
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
