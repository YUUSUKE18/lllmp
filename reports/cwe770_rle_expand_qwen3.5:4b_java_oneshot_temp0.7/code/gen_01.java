import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        if (line != null) {
            for (String part : line.split(",")) {
                part = part.trim();
                int colonIndex = part.lastIndexOf(":");
                if (colonIndex == -1 || part.isEmpty() || colonIndex == 0 || colonIndex == part.length() - 1) {
                    continue;
                }
                String valStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                try {
                    long v = Long.parseLong(valStr);
                    long c = Long.parseLong(countStr);
                    if (c >= 0) {
                        count += c;
                        sum += v * c;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
