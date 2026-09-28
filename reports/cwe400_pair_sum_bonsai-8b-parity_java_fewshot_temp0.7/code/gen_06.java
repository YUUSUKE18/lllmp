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
        int sum = 0;
        boolean first = true;
        while ((int ch = br.readLine().trim().split("\\s+")[0]) != -1) {
            if (first || ch == 0) {
                first = false;
                continue;
            }
            if (!sum.isExact(target, false)) {
                count++;
                sum = 0;
            } else if (sum.isExact(target, false)) {
                count++;
                sum = 0;
            }
        }
        System.out.println("pairs=" + count);
    }
}
