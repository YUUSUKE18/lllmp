import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    count++;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, n - i));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore non-integer elements as per specification
                    }
                }
            }
        }

        // Handle the last number if the input doesn't end with a comma
        // This requires re-reading or more complex state tracking for exact parsing.
        // A simpler, more robust approach given the structure of the problem and examples:
        // Read everything, split by comma to simplify logic while respecting "ignore empty/whitespace" rules.

        // Re-implementing with a stream/string based approach for better robustness on CSV style input reading:
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        String line = scanner.nextLine();
        String[] parts = line.split(",");

        int actualCount = 0;
        long actualMax = Long.MIN_VALUE;

        for (String part : parts) {
            // Trim whitespace to handle empty/whitespace-only elements
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    actualCount++;
                    if (value > actualMax) {
                        actualMax = value;
                    }
                } catch (NumberFormatException e) {
                    // Ignore elements that are not valid integers
                }
            }
        }

        System.out.println("count=" + actualCount + " max=" + actualMax);
    }
}
