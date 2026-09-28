import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int target = 0;
        try {
            target = Integer.parseInt(line);
        } catch (NumberFormatException e) {}
        int count = 0;
        int first = 1;
        int sum = 0;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                sum += num;
                if (first) first = 0;
                if (sum > target) count++;
                if (sum == target && first) count++;
                first = 0;
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + count);
    }
}
