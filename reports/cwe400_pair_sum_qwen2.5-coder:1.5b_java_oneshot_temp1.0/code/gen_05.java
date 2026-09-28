import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line);
        int pairCount = 0;
        int lastNumber = 0;
        boolean first = true;
        while (true) {
            line = br.readLine();
            if (line == null) break;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first) {
                        lastNumber = n;
                        first = false;
                    } else {
                        if (lastNumber + n == target) {
                            pairCount++;
                        }
                        lastNumber = n;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairCount);
    }
}
