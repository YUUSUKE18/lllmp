import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long target = Long.parseLong(br.readLine());
        int pairs = 0;
        boolean first = true;
        if (br.readLine() != null) {
            for (String line : br.readLine().split("\\s+")) {
                if (line.isEmpty()) continue;
                try {
                    long num = Long.parseLong(line);
                    if (first) { max = num; first = false; } else if (num == target - max) pairs++; else if (num > max) max = num;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
