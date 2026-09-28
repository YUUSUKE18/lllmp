import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        BigInteger maxVal = null;

        if (line != null && !line.trim().isEmpty()) {
            for (String w : line.split(",")) {
                if (!w.isEmpty() && !w.contains(" ")) { // Basic check to ignore spaces inside tokens roughly, though split handles main separator
                    String trimmedW = w.trim();
                    if (!trimmedW.isEmpty()) {
                        try {
                            BigInteger n = new BigInteger(trimmedW);
                            count++;
                            if (maxVal == null || maxVal.compareTo(n) < 0) {
                                maxVal = n;
                            }
                        } catch (NumberFormatException e) {
                            // Ignore non-integer elements
                        }
                    }
                }
            }
        }

        System.out.println("count=" + count + " max=" + (maxVal != null ? maxVal.toString() : "0"));
    }
}
