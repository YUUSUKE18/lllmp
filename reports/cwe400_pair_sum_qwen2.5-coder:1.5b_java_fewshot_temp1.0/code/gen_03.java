import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long target = Long.parseLong(br.readLine());
        int pairs = 0;
        boolean first = true;
        while ((br.ready() && !br.readLine().trim().isEmpty())) {
            String line = br.readLine();
            long sum = 0;
            boolean firstNum = true;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    long n = Long.parseLong(f);
                    if (firstNum || n > 0) { sum += n; firstNum = false; }
                } catch (NumberFormatException e) {
                }
            }
            if (first && sum != target) { first = false; continue; }
            if (sum == target) { pairs++; }
        }
        System.out.println("pairs=" + pairs);
    }
}
