import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(firstLine.trim());
        Set<Long> seen = new HashSet<>();
        long count = 0;

        while ((firstLine = br.readLine()) != null) {
            String[] parts = firstLine.split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long val = Long.parseLong(part);
                    long needed = target - val;
                    if (seen.contains(needed)) {
                        count++;
                    }
                    seen.add(val);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
