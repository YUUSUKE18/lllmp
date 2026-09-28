import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        int target = Integer.parseInt(line);
        int count = 0;
        int sum = 0;
        boolean first = true;
        while ((int val = Integer.parseInt(br.readLine())) != -1) {
            if (!first && sum + val == target) count++;
            first = false;
            sum += val;
        }
        System.out.println("pairs=" + count);
    }
}
